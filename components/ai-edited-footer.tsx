interface AIEditedFooterProps {
  aiTool?: string;
}

export function AIEditedFooter({ aiTool = 'Claude' }: AIEditedFooterProps) {
  return (
    <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        🤖 Edited with assistance from {aiTool}
      </p>
    </div>
  );
}