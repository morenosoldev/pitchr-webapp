import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { oembed } from "@loomhq/loom-embed";

export default function Content({ content, selectedColumn }) {
  const [videoHTML, setVideoHTML] = useState("");
  console.log(selectedColumn);

  useEffect(() => {
    async function getLoom() {
      if (selectedColumn?.content?.type == "loom") {
        console.log("heey");
        const { html } = await oembed(selectedColumn?.content?.video);
        console.log(html);
        setVideoHTML(html);
      }
    }
    getLoom();
  }, [selectedColumn]);

  return (
    <div className="content-parent">
      {selectedColumn?.content ? (
        <>
          {selectedColumn?.content?.type == "loom" ? (
            <div
              style={{ width: "100%", height: "100%" }}
              dangerouslySetInnerHTML={{ __html: videoHTML }}
            />
          ) : (
            <ReactPlayer
              playing={true}
              width={"100%"}
              height={"100%"}
              controls={true}
              url={selectedColumn?.content?.video}
            />
          )}
        </>
      ) : (
        <div className="content-container">
          <div className="mx-auto">
            <div className="content-icon">
              <h3 className="text-center">
                This is where your video will be previewed.
              </h3>
              <p className="text-center mt-3">
                You can include a video via Loom, or upload a prerecorded video
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
