"use client";

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Bir hata oluştu!</h2>
      <p>{error?.message}</p>
      <button
        onClick={() => {
          reset();
        }}
      >
        Tekrar dene
      </button>
    </div>
  );
}
