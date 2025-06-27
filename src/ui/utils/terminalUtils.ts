import type React from "react";
import type { ITerminalOptions, Terminal } from "xterm";
import type { FitAddon } from "xterm-addon-fit";

export const TerminalConfig : ITerminalOptions = {
    cursorBlink : true,
    fontFamily: 'monospace',
    theme: {
        background: '#1e1e1e',
        foreground: '#ffffff'
    },
    cursorStyle : 'bar',
    cursorInactiveStyle:'underline'
}

export const handleResize = (fitAddon : React.RefObject<FitAddon | null>) => {
      fitAddon.current?.fit()
}

const reRenderLine = (term: Terminal, buffer: string, cursorPos: number) => {
  term.write('\x1b[2K'); // clear entire line
  term.write('\r');      // return to line start
  term.write('$ ' + buffer);

  const moveLeft = buffer.length - cursorPos;
  if (moveLeft > 0) {
    term.write(`\x1b[${moveLeft}D`);
  }
};

export const handleTerminalRunTime = (
  key: string,
  domEvent: KeyboardEvent,
  terminalRef: React.RefObject<Terminal | null>,
  input: React.RefObject<string>,
  cursor: React.RefObject<number>
) => {
  const term = terminalRef.current;
  if (!term) return;

  // ENTER
  if (key === '\n' || domEvent.key === 'Enter') {
    term.write('\r\n$ ');
    console.log(input.current);
    input.current = '';
    cursor.current = 0;
    return;
  }

  // ARROW LEFT
  if (domEvent.key === 'ArrowLeft') {
    if (cursor.current > 0) {
      cursor.current -= 1;
      reRenderLine(term, input.current, cursor.current);
    }
    return;
  }

  // ARROW RIGHT
  if (domEvent.key === 'ArrowRight') {
    if (cursor.current < input.current.length) {
      cursor.current += 1;
      reRenderLine(term, input.current, cursor.current);
    }
    return;
  }

  // BACKSPACE
  if (key === '\b' || domEvent.key === 'Backspace') {
    if (cursor.current > 0) {
      input.current =
        input.current.slice(0, cursor.current - 1) +
        input.current.slice(cursor.current);
      cursor.current -= 1;
      reRenderLine(term, input.current, cursor.current);
    }
    return;
  }

  // DELETE
  if (domEvent.key === 'Delete') {
    if (cursor.current < input.current.length) {
      input.current =
        input.current.slice(0, cursor.current) +
        input.current.slice(cursor.current + 1);
      reRenderLine(term, input.current, cursor.current);
    }
    return;
  }

  // REGULAR CHARACTER INPUT
  if (key.length === 1 && !domEvent.ctrlKey && !domEvent.metaKey) {
    input.current =
      input.current.slice(0, cursor.current) +
      key +
      input.current.slice(cursor.current);
    cursor.current += 1;
    reRenderLine(term, input.current, cursor.current);
    return;
  }
};
