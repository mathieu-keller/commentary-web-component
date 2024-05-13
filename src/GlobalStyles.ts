class GlobalStyle {
  private globalSheets: CSSStyleSheet[] | null = null;

  private getGlobalStyleSheets() {
    if (!this.globalSheets) {
      this.globalSheets = Array.from(document.styleSheets).map((sheet) => {
        const css = Array.from(sheet.cssRules)
          .map((rule) => rule.cssText)
          .join(' ');
        const newSheet = new CSSStyleSheet();
        newSheet.replaceSync(css);
        return newSheet;
      });
    }
    return this.globalSheets;
  }

  public addGlobalStylesToShadowRoot(shadowRoot: ShadowRoot) {
    shadowRoot.adoptedStyleSheets.push(...this.getGlobalStyleSheets());
  }
}

export const GlobalStylingClass = new GlobalStyle();
