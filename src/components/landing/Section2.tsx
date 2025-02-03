import Image from "next/image";
import React from "react";

export default function Section2() {
  return (
    <>
      <div>
        <div>
          <span>Point 1</span>

          <div>
            <p>
              일의
              <span> 우선순위</span>를
            </p>
            <p>관리하세요</p>
          </div>
        </div>

        <div>
          <Image
            src="/images/landing1.png"
            width={594}
            height={497.5}
            alt="landing1.png"
          />
        </div>
      </div>
      <div>
        <div>
          <span>Point 2</span>

          <div>
            <p>해야 할 일을</p>
            <p>등록하세요</p>
          </div>
        </div>

        <div>
          <Image
            src="/images/landing2.png"
            width={436}
            height={502}
            alt="landing2.png"
          />
        </div>
      </div>
    </>
  );
}
