"use client";

import { useEffect, useRef, useState } from "react";
import AdvertItem from "../components/AdvertItem";
import { useRouter } from "next/navigation";
import { useCheckAuth } from "@/backend/utils/useCheckAuth";
import { useDispatch, useSelector } from "react-redux";
import { setFavorites } from "@/store/advertsSlice";
import classes from "./FavoriIlanlar.module.css";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmDialog from "../components/ConfirmDialog";
import AllAdverts from "../tum-ilanlar/page";

export default function FavoriIlanlar() {
  // const [favoriteAdverts, setFavoriteAdverts] = useState([]);
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const deleteDialogRef = useRef(null);
  const [selectedAdvertId, setSelectedAdvertId] = useState(null);
  const dispatch = useDispatch();
  const favoriteAdverts = useSelector((state) => state.adverts.favoriteAdverts);
  const user = useSelector((state) => state.auth.user);
  useCheckAuth();

  useEffect(() => {
    async function fetchFavoriteAdverts() {
      const token = localStorage.getItem("token");
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/adverts/favoriteAdverts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          localStorage.removeItem("token");
          router.replace("/login");
          return;
        }

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData.message);
          setError(errorData.message);
          return;
        }

        const favoriteAdvertsData = await response.json();
        dispatch(setFavorites(favoriteAdvertsData));
      } catch (err) {
        console.log("Error: " + err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFavoriteAdverts();
  }, [router]);

  async function removeFavoriteAdvert(id) {
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/adverts/favoriteAdverts/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 401) {
        localStorage.removeItem("token");
        router.replace("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        return;
      }

      const data = await response.json();

      dispatch(
        setFavorites(
          favoriteAdverts.filter((favoriteAdvert) => favoriteAdvert.id !== id)
        )
      );
    } catch (err) {
      console.log("Error: " + err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function openDeleteModal(id) {
    setSelectedAdvertId(id);
    deleteDialogRef.current.showModal();
  }

  // if (loading) return <LoadingSpinner />;
  if (error) return <p>{error}</p>;
  if (favoriteAdverts.length === 0) return <p>Favori ilanınız yok.</p>;

  return (
    <main className={classes.main}>
      <ConfirmDialog
        ref={deleteDialogRef}
        onConfirm={() => removeFavoriteAdvert(selectedAdvertId)}
        text="Bu ilanı favorilerden kaldırmak"
      />
      {favoriteAdverts &&
        favoriteAdverts.map((favoriteAdvert) => (
          <AdvertItem
            id={favoriteAdvert.id}
            key={favoriteAdvert.id}
            imgSrc={favoriteAdvert.image_src}
            brand={favoriteAdvert.brand}
            model={favoriteAdvert.model}
            engineCapacity={favoriteAdvert.engine_capacity}
            modelYear={favoriteAdvert.model_year}
            price={favoriteAdvert.price}
            city={favoriteAdvert.city}
            onDeleteDialog={() => openDeleteModal(favoriteAdvert.id)}
            showDeleteButton={user && user.id !== favoriteAdvert.user_id}
            showEditButton={false}
          />
        ))}
    </main>
  );
}
