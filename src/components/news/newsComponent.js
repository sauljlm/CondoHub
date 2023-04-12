import React from "react";

const News = ({ title, date, imageUrl, content, comments }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-lg my-12">
      <div className="p-4 border-b ">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-500">{date}</p>
      </div>
      <div className="flex">
        {imageUrl !== "placeholder" && imageUrl && (
          <div className="w-1/3 flex justify-center items-center">
            <img src={imageUrl} alt={title} className="w-full max-h-[400px] object-scale-down rounded-lg" />
          </div>
        )}
        <div className="w-2/3 p-4">
          <div className="pt-4">
            <p className="text-gray-700">{content}</p>
          </div>
          {comments?.length > 0 && (
            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-3">Comentarios</h3>
              {comments.map((comment) => (
                <div key={comment.id} className="mb-4">
                  <p className="text-gray-500 mb-2">{comment.author}</p>
                  <p className="text-gray-700">{comment.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default News;
