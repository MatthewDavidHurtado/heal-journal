// Update the VictoryArchive component to include delete functionality

// ... previous imports ...
import { Trash2, AlertCircle } from 'lucide-react';
import { deleteVictory } from '../lib/firebase';

// ... rest of the imports remain the same ...

export function VictoryArchive({ userId }: VictoryArchiveProps) {
  // ... previous state ...
  const [deletingVictory, setDeletingVictory] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState('');

  const handleDeleteVictory = async (entryId: string, victoryId: string) => {
    try {
      setDeletingVictory(victoryId);
      setDeleteError('');
      await deleteVictory(entryId, victoryId);
      
      // Update local state
      setEntries(prevEntries => 
        prevEntries.map(entry => {
          if (entry.id === entryId) {
            return {
              ...entry,
              victories: entry.victories.filter((v: Victory) => v.id !== victoryId)
            };
          }
          return entry;
        }).filter(entry => entry.victories.length > 0)
      );
    } catch (error: any) {
      setDeleteError(error.message || 'Failed to delete victory');
    } finally {
      setDeletingVictory(null);
    }
  };

  // ... rest of the code remains the same until the victory card rendering ...

  return (
    // ... previous JSX ...
    
    <div
      key={victory.id}
      className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 shadow-sm hover:shadow-md transition-all relative group"
    >
      {deleteError && victory.id === deletingVictory && (
        <div className="absolute top-2 right-2 flex items-center gap-2 text-red-600 bg-red-50 px-3 py-1 rounded-md text-sm">
          <AlertCircle className="w-4 h-4" />
          {deleteError}
        </div>
      )}
      
      <button
        onClick={() => handleDeleteVictory(entry.id, victory.id)}
        disabled={!!deletingVictory}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-red-100 rounded-full"
      >
        <Trash2 className={`w-4 h-4 text-red-600 ${
          deletingVictory === victory.id ? 'animate-spin' : ''
        }`} />
      </button>

      {/* ... rest of the victory card content remains the same ... */}
    </div>
    
    // ... rest of the component remains the same ...
  );
}