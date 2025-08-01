export default defineConfig({
  base: '/arhama-ki-dukan/', // Add this line!
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
