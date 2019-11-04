import { render, html } from '@mantou/gem';

window.addEventListener('DOMContentLoaded', () => {
  const container = document.createElement('div');
  render(
    html`
      <style>
        body {
          -webkit-app-region: drag;
        }
        a {
          -webkit-app-region: no-drag;
        }
      </style>
    `,
    container,
  );
  document.body.append(container);
});
