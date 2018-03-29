import m from 'mithril';

function view() {
  return m(`input[name="__RequestVerificationToken"][type="hidden"][value="${(window as any).antiforgeryToken}"]`);
}

export const formVerificationToken = {
  view: view
}