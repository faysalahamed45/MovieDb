export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#0f0f0f] text-center py-4 text-sm text-gray-600 dark:text-netflix-gray border-t dark:border-gray-700">
      <p>
        © {new Date().getFullYear()} HYCKY MovieDB. Inspired by Netflix.
      </p>
      <p>
        Built by <span className="text-netflix-red font-semibold">Sabbir</span>
      </p>
    </footer>
  );
}
