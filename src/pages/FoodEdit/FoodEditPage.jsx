import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getById, update, add } from "../../services/Foodservice";
import { uploadImage } from "../../services/UploadService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function FoodEditPage() {
  const { foodId } = useParams();
  const [imageUrl, setImageUrl] = useState();
  const isEditMode = !!foodId;

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (!isEditMode) return;

    getById(foodId).then((food) => {
      if (!food) return;
      reset(food);
      setImageUrl(food.imageUrl);
    });
  }, [foodId]);

  const submit = async (foodData) => {
    const food = { ...foodData, imageUrl };

    if (isEditMode) {
      await update(food);
      toast.success(`Food "${food.name}" updated successfully!`);
      navigate('/')
      return;
    }

    const newFood = await add(food);
    toast.success(`Food "${food.name}" added successfully!`);
    navigate("/admin/editFood/" + newFood.id, { replace: true });
  };

  const upload = async (event) => {
    setImageUrl(null);
    const imageUrl = await uploadImage(event);
    setImageUrl(imageUrl);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {isEditMode ? "Edit Food" : "Add Food"}
      </h2>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <div className="mb-3">
          <label htmlFor="imageUpload" className="form-label">
            Select Image
          </label>
          <input
            type="file"
            className="form-control"
            id="imageUpload"
            onChange={upload}
            accept="image/jpeg"
          />
          {imageUrl && (
            <div className="mt-3">
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="img-thumbnail"
                  style={{ maxHeight: "200px" }}
                />
              </a>
            </div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            id="name"
            {...register("name", { required: true, minLength: 5 })}
          />
          {errors.name && (
            <div className="invalid-feedback">
              Name must be at least 5 characters long.
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className={`form-control ${errors.price ? "is-invalid" : ""}`}
            id="price"
            {...register("price", { required: true })}
          />
          {errors.price && (
            <div className="invalid-feedback">Price is required.</div>
          )}
        </div>

        {/* Tags */}
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">
            Tags
          </label>
          <input
            type="text"
            className="form-control"
            id="tags"
            {...register("tags")}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="origins" className="form-label">
            Origins
          </label>
          <input
            type="text"
            className={`form-control ${errors.origins ? "is-invalid" : ""}`}
            id="origins"
            {...register("origins", { required: true })}
          />
          {errors.origins && (
            <div className="invalid-feedback">Origins is required.</div>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="cookTime" className="form-label">
            Cook Time
          </label>
          <input
            type="text"
            className={`form-control ${errors.cookTime ? "is-invalid" : ""}`}
            id="cookTime"
            {...register("cookTime", { required: true })}
          />
          {errors.cookTime && (
            <div className="invalid-feedback">Cook time is required.</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          {isEditMode ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
