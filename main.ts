import { Plugin, MarkdownRenderer } from 'obsidian';

export default class MyPlugin extends Plugin {

  async onload() {
    interface Table {
      [propName: string]: string
    }

    const tables: Table = {
      tip: 'Tip',
      info: 'Info',
      warning: 'Warning',
      danger: 'Danger',
      note: 'Note'
    };

    for (let key in tables) {
      this.registerMarkdownCodeBlockProcessor(key, async (source, el, ctx) => {        
        await MarkdownRenderer.renderMarkdown(source, el, '.', null);
        
        el.addClass('custom-block');
        el.addClass(key);
        const title = createEl('p', {text: tables[key], cls: "custom-block-title"});
        el.insertBefore(title, el.firstChild);
      })
    }

  }
    
  onunload() {

  }
}
