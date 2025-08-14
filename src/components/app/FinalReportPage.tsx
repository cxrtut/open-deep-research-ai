"use client";
import { getResearch } from "@/db/action";
import { toast } from "sonner";
import React from "react";

import { DownloadPdfButton } from "./DownloadPdfButton";
import { ReportBody } from "./ReportBody";

export const FinalReportPage = ({
  researchData,
}: {
  researchData: Awaited<ReturnType<typeof getResearch>>;
}) => {
  if (!researchData || !researchData.report) {
    return <></>;
  }

  return (
    <div className="flex flex-col size-full pt-20 md:pt-5 mx-auto max-w-[886px] px-5">
      <div className="flex flex-row gap-2 xl:px-4 items-start justify-center md:justify-end print:hidden mb-5">
        <button
          onClick={() => {
            // copy to clipboard
            toast.success("Copied to clipboard!");
            navigator.clipboard.writeText(window.location.href);
          }}
          className="cursor-pointer flex flex-col justify-center items-center overflow-hidden gap-2.5 px-3 py-1.5 rounded border-[0.5px] border-[#cad5e2]"
          style={{ filter: "drop-shadow(0px 1px 5px rgba(0,0,0,0.15))" }}
        >
          <div className="flex justify-start items-center self-stretch relative gap-1.5">
            <img src="/share.svg" alt="" className="size-4" />
            <p className="flex-grow-0 flex-shrink-0 text-sm text-left text-[#62748e]">
              Share
            </p>
          </div>
        </button>
        <DownloadPdfButton fileName={researchData.researchTopic ?? undefined} />
      </div>

      <div className="print:block hidden text-lg text-zinc-400 leading-5 mx-auto text-center mb-5">
        <a href="/" className="flex flex-row items-center gap-2">
          <div className="flex flex-row items-center gap-2">
            <div className=" text-zinc-800 dark:text-zinc-100">
              <img
                src="/logo.svg"
                alt="Wikisynth Deep Research"
                className="size-6"
              />
            </div>
            <div className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
              Wikisynth Research
            </div>
          </div>
        </a>
      </div>

      <ReportBody researchData={researchData} />
    </div>
  );
};
