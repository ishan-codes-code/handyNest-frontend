import { useMyContext } from "../context.jsx";
import { themes } from "../assets/exports.js";
import classNames from "classnames";

const ThemeSkeleton = ({ T }) => {
  return (
    <section
      id="home"
      className="w-fit h-auto border rounded-lg flex items-center bg-gradient-to-br bg-gray-50"
    >
      <div className="max-w-2xl mx-auto grid grid-cols-2 gap-3 items-center p-2">
        {/* <!-- Left Side --> */}
        <div className="space-y-2">
          {/* Title */}
          <div
            className={classNames(
              "h-2 w-1/3 rounded bg-gradient-to-r",
              T.lightBg
            )}
          ></div>
          <div
            className={classNames(
              "h-2 w-1/4 rounded bg-gradient-to-r",
              T.lightBg
            )}
          ></div>

          {/* Paragraph */}
          <div
            className={classNames(
              "h-1.5 w-3/5 rounded bg-gradient-to-r",
              T.lightBg
            )}
          ></div>
          <div
            className={classNames(
              "h-1.5 w-2/5 rounded bg-gradient-to-r",
              T.lightBg
            )}
          ></div>

          {/* Search Box */}
          <div className="mt-2 bg-white/50 border border-gray-200 rounded p-2 space-y-1">
            <div
              className={classNames(
                "h-2 w-1/4 rounded bg-gradient-to-r",
                T.lightBg
              )}
            ></div>
            <div className="flex flex-col sm:flex-row gap-1">
              <div
                className={classNames(
                  "h-5 w-full rounded bg-gradient-to-r",
                  T.lightBg
                )}
              ></div>
              <div
                className={classNames(
                  "h-5 w-20 rounded bg-gradient-to-r",
                  T.lightBg
                )}
              ></div>
              <div
                className={classNames(
                  "h-5 w-16 rounded bg-gradient-to-r",
                  T.lightBg
                )}
              ></div>
            </div>
            <div className="flex gap-1 flex-wrap">
              <div
                className={classNames(
                  "h-3 w-12 rounded-full bg-gradient-to-r",
                  T.lightBg
                )}
              ></div>
              <div
                className={classNames(
                  "h-3 w-14 rounded-full bg-gradient-to-r",
                  T.lightBg
                )}
              ></div>
              <div
                className={classNames(
                  "h-3 w-16 rounded-full bg-gradient-to-r",
                  T.lightBg
                )}
              ></div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-2">
            <div
              className={classNames(
                "h-2 w-12 rounded bg-gradient-to-r",
                T.lightBg
              )}
            ></div>
            <div
              className={classNames(
                "h-2 w-10 rounded bg-gradient-to-r",
                T.lightBg
              )}
            ></div>
            <div
              className={classNames(
                "h-2 w-14 rounded bg-gradient-to-r",
                T.lightBg
              )}
            ></div>
          </div>

          {/* CTA Buttons */}
          <div className="flex gap-2 mt-2">
            <div
              className={classNames(
                "h-6 w-28 rounded bg-gradient-to-r",
                T.lightBg
              )}
            ></div>
            <div
              className={classNames(
                "h-6 w-28 rounded bg-gradient-to-r",
                T.lightBg
              )}
            ></div>
          </div>
        </div>

        {/* <!-- Right Side: Service Cards --> */}
        <div className="grid grid-cols-2 gap-2">
          <div
            className={classNames(
              "h-14 rounded-lg bg-gradient-to-r",
              T.lightBg
            )}
          ></div>
          <div
            className={classNames(
              "h-14 rounded-lg bg-gradient-to-r",
              T.lightBg
            )}
          ></div>
          <div
            className={classNames(
              "h-14 rounded-lg bg-gradient-to-r",
              T.lightBg
            )}
          ></div>
          <div
            className={classNames(
              "h-14 rounded-lg bg-gradient-to-r",
              T.lightBg
            )}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default ThemeSkeleton;
