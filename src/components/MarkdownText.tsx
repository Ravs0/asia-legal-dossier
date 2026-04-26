import React from 'react';

interface MarkdownTextProps {
  text: string;
  className?: string;
  size?: 'xs' | 'sm' | 'base';
}

export function MarkdownText({ text, className = '', size = 'xs' }: MarkdownTextProps) {
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base'
  };

  const renderMarkdown = (input: string): React.ReactNode[] => {
    const lines = input.split('\n');
    const result: React.ReactNode[] = [];
    let inList = false;
    let listItems: React.ReactNode[] = [];
    let inOrderedList = false;
    let orderedItems: React.ReactNode[] = [];

    const flushList = () => {
      if (inList && listItems.length > 0) {
        result.push(
          <ul key={`ul-${result.length}`} className="list-disc list-inside space-y-1 my-2 ml-2">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }
      if (inOrderedList && orderedItems.length > 0) {
        result.push(
          <ol key={`ol-${result.length}`} className="list-decimal list-inside space-y-1 my-2 ml-2">
            {orderedItems}
          </ol>
        );
        orderedItems = [];
        inOrderedList = false;
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Empty line
      if (!trimmed) {
        flushList();
        result.push(<div key={`br-${i}`} className="h-2" />);
        continue;
      }

      // Horizontal rule
      if (/^---+$/.test(trimmed) || /^===+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
        flushList();
        result.push(<hr key={`hr-${i}`} className="border-dossier-border/50 my-2" />);
        continue;
      }

      // Code block
      if (trimmed.startsWith('```')) {
        flushList();
        const codeLines: string[] = [];
        i++;
        while (i < lines.length && !lines[i].trim().startsWith('```')) {
          codeLines.push(lines[i]);
          i++;
        }
        result.push(
          <pre key={`code-${i}`} className="bg-dossier-bg p-2 rounded border border-dossier-border/30 my-2 overflow-x-auto font-mono text-[10px]">
            <code>{codeLines.join('\n')}</code>
          </pre>
        );
        continue;
      }

      // Inline code
      if (trimmed.startsWith('`') && trimmed.endsWith('`') && trimmed.length > 2) {
        flushList();
        result.push(
          <code key={`inline-${i}`} className="bg-dossier-bg px-1 py-0.5 rounded text-[10px] font-mono text-dossier-accent border border-dossier-border/30">
            {trimmed.slice(1, -1)}
          </code>
        );
        continue;
      }

      // Blockquote
      if (trimmed.startsWith('>')) {
        flushList();
        result.push(
          <blockquote key={`bq-${i}`} className="border-l-2 border-dossier-accent pl-3 py-1 my-1 text-dossier-textDim italic">
            {renderInline(trimmed.slice(1).trim())}
          </blockquote>
        );
        continue;
      }

      // Unordered list
      if (/^[-*+]\s+/.test(trimmed)) {
        if (!inList) flushList();
        inList = true;
        const content = trimmed.replace(/^[-*+]\s+/, '');
        listItems.push(
          <li key={`li-${i}`} className="text-dossier-text">
            {renderInline(content)}
          </li>
        );
        continue;
      }

      // Ordered list
      if (/^\d+\.\s+/.test(trimmed)) {
        if (!inOrderedList) flushList();
        inOrderedList = true;
        const content = trimmed.replace(/^\d+\.\s+/, '');
        orderedItems.push(
          <li key={`oli-${i}`} className="text-dossier-text">
            {renderInline(content)}
          </li>
        );
        continue;
      }

      // Headings
      const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        flushList();
        const level = headingMatch[1].length;
        const sizes: Record<number, string> = {
          1: 'text-lg font-bold',
          2: 'text-base font-bold',
          3: 'text-sm font-bold',
          4: 'text-xs font-bold',
          5: 'text-xs font-semibold',
          6: 'text-[10px] font-semibold'
        };
        result.push(
          <div key={`h-${i}`} className={`${sizes[level] || sizes[6]} text-dossier-accent mt-3 mb-1`}>
            {renderInline(headingMatch[2])}
          </div>
        );
        continue;
      }

      // Default paragraph
      flushList();
      result.push(
        <p key={`p-${i}`} className="text-dossier-text leading-relaxed">
          {renderInline(trimmed)}
        </p>
      );
    }

    flushList();
    return result;
  };

  const renderInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let keyIndex = 0;

    // Pattern: bold **text**
    const boldPattern = /\*\*(.+?)\*\*/g;
    let match;
    let lastIndex = 0;

    // We need to handle multiple patterns in order
    // Use a simpler approach: split and process

    const processPattern = (input: string, pattern: RegExp, className: string): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      let lastIndex = 0;
      let match;
      const regex = new RegExp(pattern.source, pattern.flags);

      while ((match = regex.exec(input)) !== null) {
        if (match.index > lastIndex) {
          result.push(input.slice(lastIndex, match.index));
        }
        result.push(
          <span key={`md-${keyIndex++}`} className={className}>
            {match[1]}
          </span>
        );
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < input.length) {
        result.push(input.slice(lastIndex));
      }

      return result.length > 0 ? result : [input];
    };

    // Process bold
    let nodes = processPattern(remaining, /\*\*(.+?)\*\*/g, 'font-bold text-dossier-text');

    // Process italic within the result
    const processItalic = (nodes: React.ReactNode[]): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      for (const node of nodes) {
        if (typeof node === 'string') {
          const italicParts = processPattern(node, /\*(.+?)\*/g, 'italic text-dossier-textDim');
          result.push(...italicParts);
        } else {
          result.push(node);
        }
      }
      return result;
    };

    nodes = processItalic(nodes);

    // Process inline code
    const processCode = (nodes: React.ReactNode[]): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      for (const node of nodes) {
        if (typeof node === 'string') {
          const codeParts = processPattern(node, /`(.+?)`/g, 'font-mono bg-dossier-bg px-1 rounded text-[10px] text-dossier-accent border border-dossier-border/30');
          result.push(...codeParts);
        } else {
          result.push(node);
        }
      }
      return result;
    };

    nodes = processCode(nodes);

    // Process links [text](url)
    const processLinks = (nodes: React.ReactNode[]): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      for (const node of nodes) {
        if (typeof node === 'string') {
          const linkParts: React.ReactNode[] = [];
          let lastIndex = 0;
          let match;
          const regex = /\[(.+?)\]\((.+?)\)/g;

          while ((match = regex.exec(node)) !== null) {
            if (match.index > lastIndex) {
              linkParts.push(node.slice(lastIndex, match.index));
            }
            linkParts.push(
              <a key={`link-${keyIndex++}`} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-dossier-accent hover:underline">
                {match[1]}
              </a>
            );
            lastIndex = match.index + match[0].length;
          }

          if (lastIndex < node.length) {
            linkParts.push(node.slice(lastIndex));
          }

          result.push(...linkParts);
        } else {
          result.push(node);
        }
      }
      return result;
    };

    return processLinks(nodes);
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      {renderMarkdown(text)}
    </div>
  );
}
