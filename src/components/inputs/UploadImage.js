import { useCallback, useState } from 'react';
import { uploadCloudinary } from '../../api/upload';

const UploadImage = ({ onChange, SetIsLoading, urlImage }) => {
  const [resImage, setResImage] = useState(urlImage);

  const handleUpload = useCallback(
    async (e) => {
      const files = e.target.files;
      try {
        SetIsLoading(true);
        const result = [];
        for (const file of files) {
          const res = await uploadCloudinary(file);
          let picture = {
            url: res.url,
            public_id: res.public_id,
          };
          result.push(picture);
        }
        setResImage(result);
        onChange(result);
        SetIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    },
    [onChange, SetIsLoading]
  );

  return (
    <div>
      <div className="relative w-fit flex gap-1 items-center ml-5">
        <i className="fa-solid fa-images"></i>
        <button>Thêm Ảnh</button>
        <input
          type="file"
          multiple
          className="opacity-0 absolute left-0 w-32 cursor-pointer"
          onChange={handleUpload}
        />
      </div>
      <div className="flex items-center ml-5 mt-4">
        {resImage &&
          resImage.map((res) => (
            <div>
              <img src={res.url} alt="review" className="object h-[50px]" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default UploadImage;