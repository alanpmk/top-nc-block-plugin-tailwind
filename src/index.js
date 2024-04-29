import React, { useState, useCallback, useEffect } from "react";
import {
  sortableContainer,
  sortableElement,
  sortableHandle,
} from 'react-sortable-hoc';
import { arrayMoveImmutable } from 'array-move';

wp.blocks.registerBlockType("topnhacai/top-nha-cai-plugin", {
  title: "Top Nha Cai Block",
  icon: "welcome-learn-more",
  category: "common",
  attributes: {
    lists: { type: "string", default: "[]" },
  },
  edit: EditComponent,
  save: () => {
    return null;
  },
});

function EditComponent(props) {
  const [lists, setLists] = useState(JSON.parse(props.attributes.lists));
  const [editIndex, setEditIndex] = useState(null);
  const [isDelete, setIsDelete] = useState(null);
// Add a new state variable for the image URL
const [imageUrl, setImageUrl] = useState(null);

function openMediaUploaderAdd(e) {
  e.preventDefault();
  document.getElementById("topnhacaiAdd").close();
  let frame = wp.media({
    title: 'Chọn ảnh logo',
    button: {
      text: 'Dùng ảnh này'
    },
    multiple: false  // Set to true to allow multiple files to be selected
  });

  // When an image is selected in the media frame...
  frame.on('select', function() {
    // Get media attachment details from the frame state
    var attachment = frame.state().get('selection').first().toJSON();

    // Set the URL of the selected image to the imageUrl state variable
    setImageUrl(attachment.url);
    document.getElementById("topnhacaiAdd").showModal();
  });

  // Open the media frame
  frame.open();
}

  function openMediaUploaderEdit(e) {
    e.preventDefault();
    document.getElementById("topnhacaiEdit").close();
    let frame = wp.media({
      title: 'Chọn ảnh logo',
      button: {
        text: 'Dùng ảnh này'
      },
      multiple: false  // Set to true to allow multiple files to be selected
    });

    // When an image is selected in the media frame...
    frame.on('select', function () {
      // Get media attachment details from the frame state
      var attachment = frame.state().get('selection').first().toJSON();

      // Set the URL of the selected image to the imageUrl state variable
      setImageUrl(attachment.url);
      document.getElementById("topnhacaiEdit").showModal();
    });

    // Open the media frame
    frame.open();
  }
  // console.log('list is: ', lists);

  useEffect(() => {
    function addlistDefault() {
      let arrrays = [
        {
          name: "VN88",
          link: "https://vn88.com",
          slogan: "Nhà cái VIP",
          giftTitle: "Khuyến mãi 100%",
          giftDesc: "Tặng 100% tiền nạp đầu tiên",
          logo: "http://webcobac.test/wp-content/uploads/2018/12/advt-400-300.png",
        },
        {
          name: "i9Bet",
          link: "https://vn88.com",
          slogan: "Nhà cái xanh chín truyền thống",
          giftTitle: "Tặng 150k free khi đăng ký",
          giftDesc: "Hoàn trả lên đến 3%!",
          logo: "http://webcobac.test/wp-content/uploads/2018/12/advt-400-300.png",
        },
      ];
      props.setAttributes({ lists: JSON.stringify(arrrays) });
    }
    // addlistDefault();
  }, []);
  // update attributes
  const updateAtrributes = useCallback(() => {
    props.setAttributes({ lists: JSON.stringify(lists) });
  }, [lists]);
  //DragHandle
  const DragHandle = sortableHandle(() => <div className="flex items-center font-bold text-sm space-x-1 hover:cursor-move absolute z-50 top-1 left-[30%] text-red-500"><i className='bx bx-move text-4xl'></i></div>);

  // Sortable elements
  function onSortEnd({ oldIndex, newIndex }) {
    let TmpLists = arrayMoveImmutable(lists, oldIndex, newIndex);
    setLists(TmpLists);
    props.setAttributes({ lists: JSON.stringify(TmpLists) });
  }
  // Sortable Item
  const SortableItem = sortableElement(({ item, postion }) => (
    <div className={`topnhacai my-3 relative`}>
      <DragHandle />
      <div className="bg-slate-300 absolute z-40 top-0 left-0 w-6 h-6 rounded-br-full text-sm font-bold"><span className="ml-1">{postion + 1}</span></div>
      <div className="bg-black rounded-md drop-shadow-lg p-2 text-white">
        <div style={{ display:"flex",flexDirection:"space-around" }}>
          <div className="space-x-2" style={{ display:"flex",alignItems:"center" }}>
            <img
              src={item.logo}
              alt=""
              className="avatar w-20 h-20 rounded-full "
              style={{ maxWidth: "80px", maxHeight: "80px" }}
            />
            <div className="w-[170px]">
              <h2 className="text-lg font-bold">{item.name}</h2>
              <span className="my-0">
                <i class="bx bxs-star text-yellow-500 text-xs"></i>
                <i class="bx bxs-star text-yellow-500 text-xs"></i>
                <i class="bx bxs-star text-yellow-500 text-xs"></i>
                <i class="bx bxs-star text-yellow-500 text-xs"></i>
                <i class="bx bxs-star text-yellow-500 text-xs"></i>
              </span>
              <p className="text-sm">{item.slogan}</p>
            </div>
          </div>
          <div className="description flex-1 justify-center items-center text-center" style={{ display:"flex" }}>
            <div>
              <h2 className="text-yellow-500 text-lg font-bold">
                {item.giftTitle}
              </h2>
              <p className="text-sm">{item.giftDesc}</p>
            </div>
          </div>
          <div className="relative flex justify-center items-center w-[180px]">
            <a
              href={item.link}
              target="_blank"
              rel="nofollow sponsored noopener"
              className="w-full bg-[#c00] text-white font-bold text-center px-2 py-1 rounded-md hover:bg-yellow-500"
            >
              Truy cập {item.name}
            </a>
            <button
              className="absolute top-0 right-4 text-green-500 text-xs"
              onClick={() => editTop(postion)}
            >
              <i class="bx bxs-edit"></i>Chỉnh sửa
            </button>
            <button
              className="absolute flex items-center bottom-0 right-5 text-red-500 text-xs"
              onClick={() => deleteTop(postion)}
            >
              <i class="bx bxs-comment-x text-sm"></i>
              <p>Xóa</p>
            </button>
          </div>
        </div>
        <div className="mb-description flex flex-1 justify-center items-center text-center mt-1 border-t border-red-500">
          <div>
            <h2 className="text-yellow-500 text-lg font-bold">
              {item.giftTitle}
            </h2>
            <p className="text-sm">{item.giftDesc}</p>
          </div>
        </div>
      </div>
    </div>
  ));
  //Sortabel Container
  const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
  });
  useEffect(() => {
    setLists(JSON.parse(props.attributes.lists));
  }, [props.attributes.lists]);

  function addNew() {
    console.log('add new');
    var modal = document.getElementById("topnhacaiAdd");
    modal.showModal();

    // Clear old input values
    var inputs = modal.getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    }
  }
  function editTop(index) {

    setEditIndex(() => {
      const data = { id: index, ...lists[index] }; // create a copy of the lists array
      return data; // return the updated array
    });
    setImageUrl(lists[index].logo);
    document.getElementById("topnhacaiEdit").showModal();
  }

  function deleteTop(index) {
    let testlogic = window.confirm("Bạn có chắc chắn muốn xóa?");
    if (testlogic) {
      console.log('delete');
      lists.splice(index, 1);
      setLists([...lists]);
      updateAtrributes();
    } else {
      console.log('cancel');
    }
  }

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const { id, ...rest } = data;
    const newdata = { order: id, ...rest };
    let newLists = lists;
    newLists[data.id] = rest;
    setLists(newLists);
    updateAtrributes();
    document.getElementById("topnhacaiEdit").close();
  };

  const handleSubmitAddNew = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    const newdata = { order: lists.length.toString(), ...data };
    const newLists = [...lists, newdata];
    setLists(newLists);
    props.setAttributes({ lists: JSON.stringify(newLists) });
    document.getElementById("topnhacaiAdd").close();
  }
  const handleEditFormInputChange = (event) => {
    const { name, value } = event.target;

    setEditIndex(prevEditIndex => {
      return { ...prevEditIndex, [name]: value };
    });
  };

  const handleAddFormInputChange = (event) => {
    const { name, value } = event.target;
    setEditIndex(prevEditIndex => {
      return { ...prevEditIndex, [name]: value };
    });
  };
  return (
    <div className="top-nha-cai-wrapper-class">
      <div className="bg-white rounded-md p-2 space-x-2">
        <h2 className="text-2xl font-bold uppercase text-center">Block Top nhà cái</h2>
        <button
          class="cursor-pointer flex items-center rounded-md bg-green-500 ml-2 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600"
          onClick={() => addNew()}
        >
          <i class="bx bxs-folder-plus text-base mr-1"></i>Thêm
        </button>

        <div>
          {imageUrl && <img className="hidden" src={imageUrl} alt="Selected" />}
        </div>

        <SortableContainer onSortEnd={onSortEnd} useDragHandle lockAxis="y">
          {lists.map((item, index) => (
            <SortableItem key={`item-${index}`} item={item} postion={index} index={index} />
          ))}
        </SortableContainer>


        <dialog id="topnhacaiAdd" className="modal">
          <div className="modal-box bg-white">
            <form method="dialog" class="rounded-lg border border-slate-300" onSubmit={handleSubmitAddNew}>
              <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("topnhacaiAdd").close()}>
                ✕
              </div>
              <div class="mt-3 text-center text-xl font-bold">Thêm mới</div>
              <div class="p-2 text-base">
                <div class="flex gap-4">
                  <div className="mt-1 block w-1/2">
                    <label for="name" class="text-sm font-semibold text-gray-500">Tên nhà cái</label>
                    <input
                      type="Name"
                      name="name"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleAddFormInputChange}
                      placeholder="Tên nhà cái"

                    />
                  </div>
                  <div className="mt-1 block w-1/2">
                    <label for="slogan" class="text-sm font-semibold text-gray-500">Slogan</label>
                    <input
                      type="text"
                      name="slogan"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleAddFormInputChange}
                      placeholder="Slogan"
                    />
                  </div>

                </div>
                <div class="my-3 flex gap-4">
                  <div className="mt-1 block w-1/2">
                    <label for="giftTitle" class="text-sm font-semibold text-gray-500">Tiêu đề Khuyến mại</label>
                    <input
                      type="text"
                      name="giftTitle"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleAddFormInputChange}
                      placeholder="Khuyến mãi chính"
                    />
                  </div>
                  <div className="mt-1 block w-1/2">
                    <label for="giftDesc" class="text-sm font-semibold text-gray-500">Mô tả KM</label>
                    <input
                      type="text"
                      name="giftDesc"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleAddFormInputChange}
                      placeholder="KM mô tả"
                    />
                  </div>


                </div>
                <div class="my-6 flex gap-4">
                  <div className="mt-1 block w-1/2">
                    <label for="link" class="text-sm font-semibold text-gray-500">Link nhà cái</label>
                    <input
                      type="text"
                      name="link"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleAddFormInputChange}
                      placeholder="Link nhà cái"

                    />
                  </div>
                  <div className="mt-1 block w-1/2">
                    <div>
                    <label for="logo" class="text-sm font-semibold text-gray-500">Logo</label>
                      <button className="rounded-md bg-green-500 ml-2 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600" onClick={(e) => openMediaUploaderAdd(e)}>Chọn ảnh</button>
                    </div>
                    {imageUrl && <img className="w-14 h-14" src={imageUrl} alt="Selected" />}
                    <input
                      type="text"
                      name="logo"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleAddFormInputChange}
                      placeholder="URL logo"
                      value={imageUrl}
                    />
                  </div>
                </div>
                <div class="text-center mb-2">
                  <button type="submit" class="cursor-pointer rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white">
                    Thêm mới
                  </button>
                </div>
              </div>
            </form>
            {/* <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
          </div>
        </dialog>


        <dialog id="topnhacaiEdit" className="modal">
          <div className="modal-box bg-white">
            <form method="dialog" class="rounded-lg border border-slate-300" onSubmit={handleSubmitEdit}>
              <input type="hidden" name="id" value={editIndex && editIndex.id} />
              <div className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("topnhacaiEdit").close()}>
                ✕
              </div>
              <div class="mt-3 text-center text-xl font-bold">Chỉnh sửa</div>
              <div class="p-2 text-base">
                <div class="flex gap-4">
                  <div className="mt-1 block w-1/2">
                    <label for="name" class="text-sm font-semibold text-gray-500">Tên nhà cái</label>
                    <input
                      type="Name"
                      name="name"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleEditFormInputChange}
                      placeholder="Tên nhà cái"
                      value={editIndex && editIndex.name}
                    />
                  </div>
                  <div className="mt-1 block w-1/2">
                    <label for="slogan" class="text-sm font-semibold text-gray-500">Slogan</label>
                    <input
                      type="text"
                      name="slogan"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleEditFormInputChange}
                      placeholder="Slogan"
                      value={editIndex && editIndex.slogan}
                    />
                  </div>

                </div>
                <div class="my-3 flex gap-4">
                  <div className="mt-1 block w-1/2">
                    <label for="giftTitle" class="text-sm font-semibold text-gray-500">Tiêu đề Khuyến mại</label>
                    <input
                      type="text"
                      name="giftTitle"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleEditFormInputChange}
                      placeholder="Khuyến mãi chính"
                      value={editIndex && editIndex.giftTitle}
                    />
                  </div>
                  <div className="mt-1 block w-1/2">
                    <label for="giftDesc" class="text-sm font-semibold text-gray-500">Mô tả KM</label>
                    <input
                      type="text"
                      name="giftDesc"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleEditFormInputChange}
                      placeholder="KM mô tả"
                      value={editIndex && editIndex.giftDesc}
                    />
                  </div>


                </div>
                 <div class="my-6 flex gap-4">
                  <div className="mt-1 block w-1/2">
                    <label for="link" class="text-sm font-semibold text-gray-500">Link nhà cái</label>
                    <input
                      type="text"
                      name="link"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleEditFormInputChange}
                      placeholder="Link nhà cái"
                      value={editIndex && editIndex.link}
                    />
                  </div>
                 {/*<div className="mt-1 block w-1/2">
                    <label for="logo" class="text-sm font-semibold text-gray-500">Logo</label>
                    <input
                      type="text"
                      name="logo"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleEditFormInputChange}
                      placeholder="URL logo"
                      value={editIndex && editIndex.logo}
                    />
                  </div>*/}

                  <div className="mt-1 block w-1/2">
                    <div>
                      <label for="logo" class="text-sm font-semibold text-gray-500">Logo</label>
                      <button className="rounded-md bg-green-500 ml-2 px-4 py-2 text-sm font-semibold text-white hover:bg-green-600" onClick={(e) => openMediaUploaderEdit(e)}>Chọn ảnh</button>
                    </div>
                    {imageUrl && <img className="w-14 h-14" src={imageUrl} alt="Selected" />}
                    <input
                      type="text"
                      name="logo"
                      class="block w-full rounded-md border border-slate-300 bg-white px-2 py-2 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                      onChange={handleEditFormInputChange}
                      placeholder="URL logo"
                      value={imageUrl}
                    />
                  </div>

                </div>
                <div class="text-center mb-2">
                  <button type="submit" class="cursor-pointer rounded-md bg-green-500 px-4 py-2 text-sm font-semibold text-white">
                    Sửa
                  </button>
                </div>
              </div>
            </form>
            {/* <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
          </div>
        </dialog>
      </div>
    </div>
  );
}
