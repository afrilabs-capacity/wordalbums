import TextField from "../components/inputs/text-input";
import BasicButton from "../components/buttons/basic-button";
import { useBookStore } from "../stores/book-store";

export default function AdEditModal({
  modalOpen,
  hideAdModal,
  updateAdvert,
  handleAdIdChange,
  value,
}) {
  const { pageAdvertId } = useBookStore((state) => state);
  return (
    <div
      className={`fixed z-10 overflow-y-auto top-0 w-full left-0 ${
        modalOpen ? "" : "hidden"
      } id="modal"`}
    >
      <div class="flex items-center justify-center min-height-100vh pt-4 px-4 pb-20 text-center sm:block sm:p-0 bg-">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-900 opacity-75" />
        </div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div
          class="inline-block align-center bg-white rounded-lg text-left  shadow-xl transform transition-all sm:my-8 sm:align-middle w-6/12 h-4/12 "
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* modal body */}
            <div className="p-2">
              <h1 className="text-2xl font-bold text-center">
                {/* {getActiveWidgetTitle(currentEditingWidget, widgets)} */}
                Ad ID
              </h1>
            </div>

            <div className="p-2 flex justify-center">
              <TextField
                placeholder={"Place ad code..."}
                classes="w-8/12"
                handleChange={handleAdIdChange}
                value={value}
              />
            </div>

            <div className="flex justify-center">
              <BasicButton
                disabled={!value}
                title={"Update"}
                classes="px-8 w-8/12"
                handleClick={() => updateAdvert()}
              />
            </div>

            {/* modal body */}
          </div>
          <div class="bg-gray-200 px-4 py-3 text-right">
            <button
              type="button"
              class="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700 mr-2"
              onClick={() => hideAdModal()}
            >
              <i class="fas fa-times"></i> Close
            </button>
            {/* <button
                type="button"
                class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700 mr-2"
              >
                <i class="fas fa-plus"></i> Create
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
