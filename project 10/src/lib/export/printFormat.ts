import { format } from 'date-fns';
import type { StorageEntry } from '../storage/types';

export function generatePrintableContent(entries: StorageEntry[]): string {
  const formatDate = (dateStr: string) => format(new Date(dateStr), 'MMMM d, yyyy');
  
  const content = entries.map(entry => {
    const beliefs = entry.beliefs
      .map((belief, index) => 
        `${index + 1}. Belief: ${belief.belief}\n   Understanding: ${belief.howIsItALie}`
      )
      .join('\n\n');

    const victories = entry.victories
      ?.map(victory => 
        `• ${victory.title} (${victory.category})\n  ${victory.description}\n  Date: ${format(new Date(victory.date), 'MMMM d, yyyy')}`
      )
      .join('\n\n') || '';

    return `
=================================================================
HEALING JOURNEY ENTRY - ${formatDate(entry.createdAt)}
=================================================================

Thread: ${entry.threadTitle}
Color: ${entry.color}
Number: ${entry.number}

REFLECTION
-----------------------------------------------------------------
${entry.content}

${entry.beliefs.length > 0 ? `\nBELIEFS EXPLORED\n-----------------------------------------------------------------\n${beliefs}` : ''}

${entry.victories && entry.victories.length > 0 ? `\nVICTORIES CELEBRATED\n-----------------------------------------------------------------\n${victories}` : ''}
`;
  }).join('\n\n');

  return `
H.E.A.L. JOURNAL
Personal Healing Journey
Generated on ${format(new Date(), 'MMMM d, yyyy')}

${content}
`;
}