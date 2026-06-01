<script lang="ts">
  import { JSONEditor } from 'svelte-jsoneditor'
  import { formatJson, isLikelyJsonPaste } from './lib/json-utils'

  let textValue = ''
  let treeContent = {
    json: {}
  }

  let status: 'idle' | 'valid' | 'invalid' = 'idle'
  let errorMessage: string | null = null
  let copyStatus = ''

  function applyJsonText(input: string, shouldBeautify: boolean) {
    const result = formatJson(input)

    if (!result.ok) {
      textValue = input
      status = input.trim() ? 'invalid' : 'idle'
      errorMessage = input.trim() ? result.error : null
      return
    }

    textValue = shouldBeautify ? result.pretty : input
    treeContent = {
      json: result.parsed
    }

    status = 'valid'
    errorMessage = null
  }

  function handleTextInput(event: Event) {
    const target = event.target as HTMLTextAreaElement
    textValue = target.value

    const result = formatJson(textValue)

    if (result.ok) {
      treeContent = {
        json: result.parsed
      }

      status = 'valid'
      errorMessage = null
      return
    }

    status = textValue.trim() ? 'invalid' : 'idle'
    errorMessage = textValue.trim() ? result.error : null
  }

  function handlePaste(event: ClipboardEvent) {
    const pastedText = event.clipboardData?.getData('text')

    if (!pastedText || !isLikelyJsonPaste(pastedText)) {
      return
    }

    const result = formatJson(pastedText)

    if (!result.ok) {
      return
    }

    event.preventDefault()
    applyJsonText(pastedText, true)
  }

  function beautify() {
    applyJsonText(textValue, true)
  }

  function minify() {
    const result = formatJson(textValue)

    if (!result.ok) {
      status = 'invalid'
      errorMessage = result.error
      return
    }

    textValue = result.minified
    treeContent = {
      json: result.parsed
    }

    status = 'valid'
    errorMessage = null
  }

  async function copyJson() {
    if (!textValue.trim()) return

    await navigator.clipboard.writeText(textValue)
    copyStatus = 'Copied'

    window.setTimeout(() => {
      copyStatus = ''
    }, 1200)
  }

  function clearJson() {
    textValue = ''
    treeContent = {
      json: {}
    }

    status = 'idle'
    errorMessage = null
    copyStatus = ''
  }
</script>

<div class="app-shell">
  <header class="toolbar">
    <div class="title-block">
      <h1>JSON Beautifier</h1>
      <p>Paste JSON, auto-format it, then inspect the structure.</p>
    </div>

    <div class="actions">
      <button type="button" class="primary" on:click={beautify} disabled={!textValue.trim()}>
        Beautify
      </button>

      <button type="button" on:click={minify} disabled={!textValue.trim()}>
        Minify
      </button>

      <button type="button" on:click={copyJson} disabled={!textValue.trim()}>
        {copyStatus || 'Copy'}
      </button>

      <button type="button" class="danger" on:click={clearJson} disabled={!textValue.trim()}>
        Clear
      </button>
    </div>
  </header>

  <main class="workspace">
    <section class="pane">
      <div class="pane-header">
        <span>Raw / Formatted JSON</span>

        {#if status === 'valid'}
          <strong class="status-valid">Valid JSON</strong>
        {:else if status === 'invalid'}
          <strong class="status-invalid">Invalid JSON</strong>
        {:else}
          <strong class="status-idle">Ready</strong>
        {/if}
      </div>

      <textarea
        bind:value={textValue}
        on:input={handleTextInput}
        on:paste={handlePaste}
        spellcheck="false"
        placeholder="Paste your JSON here..."
      ></textarea>

      {#if errorMessage}
        <div class="error-box">
          {errorMessage}
        </div>
      {/if}
    </section>

    <section class="pane">
      <div class="pane-header">
        <span>Tree Viewer</span>
        <strong class="status-idle">Expand / Collapse</strong>
      </div>

      <div class="tree-container">
        <JSONEditor
          bind:content={treeContent}
          mode="tree"
        />
      </div>
    </section>
  </main>

  <footer class="status-bar">
  <span>
    {#if status === 'valid'}
      JSON is valid
    {:else if status === 'invalid'}
      JSON has syntax error
    {:else}
      Ready
    {/if}
  </span>

  <span class="copyright">
    Copyright © 2026 - Kristian Andi
  </span>

  <span>{textValue.length} chars</span>
</footer>
</div>

<style>
  :global(.jse-theme-dark) {
    color-scheme: dark;
  }

  .app-shell {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: #020617;
    color: #e2e8f0;
  }

  .toolbar {
    height: 64px;
    flex: 0 0 auto;
    padding: 10px 16px;
    border-bottom: 1px solid #1e293b;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    background: #0f172a;
  }

  .title-block h1 {
    margin: 0;
    font-size: 16px;
    line-height: 1.2;
  }

  .title-block p {
    margin: 4px 0 0;
    font-size: 12px;
    color: #94a3b8;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  button {
    border: 1px solid #334155;
    background: #1e293b;
    color: #e2e8f0;
    height: 34px;
    padding: 0 12px;
    border-radius: 8px;
    font-size: 13px;
    cursor: pointer;
  }

  button:hover:not(:disabled) {
    background: #334155;
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  button.primary {
    border-color: #0284c7;
    background: #0284c7;
  }

  button.primary:hover:not(:disabled) {
    background: #0369a1;
  }

  button.danger {
    border-color: #7f1d1d;
    background: #450a0a;
    color: #fecaca;
  }

  button.danger:hover:not(:disabled) {
    background: #7f1d1d;
  }

  .workspace {
    flex: 1 1 auto;
    min-height: 0;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    overflow: hidden;
  }

  .pane {
    min-width: 0;
    min-height: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    border-right: 1px solid #1e293b;
  }

  .pane:last-child {
    border-right: none;
  }

  .pane-header {
    height: 40px;
    flex: 0 0 auto;
    padding: 0 14px;
    border-bottom: 1px solid #1e293b;
    background: #020617;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #94a3b8;
  }

  .pane-header strong {
    text-transform: none;
    letter-spacing: normal;
    font-weight: 600;
  }

  .status-valid {
    color: #34d399;
  }

  .status-invalid {
    color: #f87171;
  }

  .status-idle {
    color: #64748b;
  }

  textarea {
    flex: 1 1 auto;
    min-height: 0;
    width: 100%;
    resize: none;
    border: none;
    outline: none;
    padding: 14px;
    background: #020617;
    color: #e2e8f0;
    font-family: "Cascadia Code", Consolas, Monaco, monospace;
    font-size: 13px;
    line-height: 1.6;
  }

  textarea::placeholder {
    color: #475569;
  }

  .error-box {
    flex: 0 0 auto;
    padding: 10px 14px;
    border-top: 1px solid #7f1d1d;
    background: #450a0a;
    color: #fecaca;
    font-size: 12px;
    font-family: "Cascadia Code", Consolas, Monaco, monospace;
  }

  .tree-container {
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
    background: #0f172a;
  }

  .tree-container :global(.jse-main) {
    height: 100%;
  }

  .tree-container :global(.jse-contents) {
    height: 100%;
  }

  .status-bar {
    height: 28px;
    flex: 0 0 auto;
    padding: 0 14px;
    border-top: 1px solid #1e293b;
    background: #0f172a;
    color: #94a3b8;
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    font-size: 12px;
  }

  .status-bar span:last-child {
    text-align: right;
  }

  .copyright {
    color: #64748b;
  }
</style>