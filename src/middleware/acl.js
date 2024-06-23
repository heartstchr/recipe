export default function({
  store: {
    getters: { 'auth/isAuthenticated': isAuthenticated }
  }
}) {
  if (!isAuthenticated) return
}
