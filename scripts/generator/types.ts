
export type ThemeSetting = {
  id: string;
  name: string;
  type: string;
  scheme: {
    defaultAccent: string;
    background: string;
    backgroundAlt: string;
    contrastBorder: string;
    sidebarForeground: string;
    scrollbars: string;
    comments: string;
    caret: string;
    findHighlight: string;
    foreground: string;
    focusBorder: string;
    guides: string;
    lineNumbers: string;
    invisibles: string;
    lineHighlight: string;
    selection: string;
    shadow: string;
    inputBackground: string;
    inputForeground: string;
    inputBorder: string;
    scrollbarsHover: string;
    statusbarForeground: string;
    listHoverForeground: string;
    tabActiveForeground: string;
    inactiveSelectionBackground: string;
    findMatchBackground: string;
    findMatchHighlightBackground: string;
    findMatchHighlightBorder: string;
    /**
     * Editor surface background (defaults to ``background`` when omitted).
     */
    editorBackground?: string;
    /**
     * Current-line background in the editor (solid hex; defaults to ``lineHighlight`` with alpha).
     */
    editorLineHighlightBackground?: string;
    /**
     * Borders: editor group, panel, sidebar, list focus, tab top; scrollbar active/hover.
     */
    workbenchBorderAccent?: string;
    base: {
      white: string;
      black: string;
      red: string;
      orange: string;
      yellow: string;
      green: string;
      cyan: string;
      blue: string;
      paleblue: string;
      purple: string;
      brown: string;
      pink: string;
      violet: string;
    };
  };
};
