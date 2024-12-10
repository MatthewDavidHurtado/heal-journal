import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const scheduleHealReminder = functions.pubsub
  .schedule('0 */4 * * *')  // Every 4 hours
  .onRun(async (context) => {
    const db = admin.firestore();
    const messaging = admin.messaging();
    
    try {
      const usersSnapshot = await db
        .collection('users')
        .where('notificationsEnabled', '==', true)
        .get();

      const notifications = usersSnapshot.docs.map(async (doc) => {
        const userData = doc.data();
        const lastNotification = userData.lastNotificationTime?.toDate() || new Date(0);
        const hoursSinceLastNotification = 
          (new Date().getTime() - lastNotification.getTime()) / (1000 * 60 * 60);

        if (hoursSinceLastNotification >= 4) {
          await messaging.send({
            token: userData.notificationToken,
            notification: {
              title: 'Time to H.E.A.L.',
              body: 'Ready for your next healing session? Take a moment to continue your journey.'
            },
            webpush: {
              fcmOptions: {
                link: 'https://your-app-url.com'
              }
            }
          });

          await doc.ref.update({
            lastNotificationTime: admin.firestore.FieldValue.serverTimestamp()
          });
        }
      });

      await Promise.all(notifications);
      return null;
    } catch (error) {
      console.error('Error sending notifications:', error);
      return null;
    }
  });