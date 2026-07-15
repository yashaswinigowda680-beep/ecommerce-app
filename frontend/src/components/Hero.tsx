export default function Hero() {
  return (
    <section className="bg-orange-50">
      <div className="mx-auto max-w-7xl px-6 py-24">

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
          New Season
        </p>

        <h1 className="max-w-3xl text-6xl font-bold leading-tight text-gray-900">
          Everyday objects,
          <br />
          made to last.
        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
          Thoughtfully designed essentials for everyday living.
          Discover timeless products that combine quality,
          simplicity, and functionality.
        </p>

        <button className="mt-10 rounded-full bg-black px-8 py-4 text-white transition hover:bg-gray-800">
          Shop Collection
        </button>

      </div>
    </section>
  );
}