<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { EditorView, basicSetup } from 'codemirror'
  import { json } from '@codemirror/lang-json'
  import { oneDark } from '@codemirror/theme-one-dark'

  export let value = ''
  export let placeholder = 'Paste your JSON here...'
  export let onChange: (value: string) => void = () => {}
  export let onPasteJson: (text: string) => boolean = () => false

  let editorHost: HTMLDivElement
  let editorView: EditorView | null = null
  let internalUpdate = false

  onMount(() => {
    editorView = new EditorView({
      doc: value,
      parent: editorHost,
      extensions: [
        basicSetup,
        json(),
        oneDark,
        EditorView.lineWrapping,
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '13px'
          },
          '.cm-scroller': {
            fontFamily: '"Cascadia Code", Consolas, Monaco, monospace'
          },
          '.cm-content': {
            minHeight: '100%',
            padding: '14px'
          },
          '.cm-line': {
            lineHeight: '1.6'
          },
          '.cm-gutters': {
            backgroundColor: '#020617',
            color: '#64748b',
            borderRight: '1px solid #1e293b'
          },
          '.cm-activeLineGutter': {
            backgroundColor: '#0f172a'
          },
          '.cm-activeLine': {
            backgroundColor: '#111827'
          }
        }),
        EditorView.updateListener.of((update) => {
          if (!update.docChanged || internalUpdate) return

          const nextValue = update.state.doc.toString()
          onChange(nextValue)
        }),
        EditorView.domEventHandlers({
          paste(event) {
            const pastedText = event.clipboardData?.getData('text')

            if (!pastedText) {
              return false
            }

            const handled = onPasteJson(pastedText)

            if (handled) {
              event.preventDefault()
              return true
            }

            return false
          }
        })
      ]
    })
  })

  $: if (editorView && value !== editorView.state.doc.toString()) {
    internalUpdate = true

    editorView.dispatch({
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: value
      }
    })

    internalUpdate = false
  }

  onDestroy(() => {
    editorView?.destroy()
  })
</script>

<div class="editor-wrapper">
  {#if !value}
    <div class="placeholder">
      {placeholder}
    </div>
  {/if}

  <div bind:this={editorHost} class="editor-host"></div>
</div>

<style>
  .editor-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 0;
    background: #020617;
  }

  .editor-host {
    width: 100%;
    height: 100%;
  }

  .placeholder {
    position: absolute;
    top: 14px;
    left: 54px;
    z-index: 1;
    color: #475569;
    font-family: "Cascadia Code", Consolas, Monaco, monospace;
    font-size: 13px;
    pointer-events: none;
  }

  :global(.cm-editor) {
    height: 100%;
    outline: none;
  }

  :global(.cm-focused) {
    outline: none;
  }
</style>