import { useState, useEffect, useRef } from "react";

import { RiDeleteBin5Fill, RiEditBoxLine } from "react-icons/ri";
import { GrAddCircle } from "react-icons/gr";

import Checkboxbutton from "./common/Checkboxbutton";
import Button from "./common/Button";
import RadioButton from "./common/RadioButton";

import signal from "./icons/signal.svg";
import Wifi from "./icons/Wifi.svg";
import Battery from "./icons/Battery.svg";
import TimeStyle from "./icons/timestyle.png";
const TodoItems = () => {
  const [title, setTitle] = useState("");
  const [titleEdit, setTitleEdit] = useState("");
  const [todo, setTodo] = useState([]);
  const [isinputValid, setInputValid] = useState(true);
  const [editIndex, setEditIndex] = useState(null);
  const [checkedItems, setCheckedItems] = useState({});
  const [filter, setFilter] = useState("all");
  const [isactive, setActive] = useState(false);

  const containerRef = useRef(null);
  const editInputRef = useRef(null);
  const inputRef = useRef(null);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleClick = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      handleEditSubmit(event);
    }
  };
  const filteredTodo = () => {
    switch (filter) {
      case "complete":
        return todo.filter((item, index) => checkedItems[index] === true);
      case "incomplete":
        return todo.filter((item, index) => checkedItems[index] !== true);
      case "all":
        return todo;
      default:
        return todo;
    }
  };

  const handleCheckboxChange = (id) => {
    setCheckedItems((prevCheckedItems) => {
      return {
        ...prevCheckedItems,
        [id]: !prevCheckedItems[id],
      };
    });
  };

  const formValidation = (input) => {
    if (input.trim() === "") {
      setInputValid(false);
      return false;
    }

    setInputValid(true);
    return true;
  };

  const deleteTodo = (index) => {
    let updatedtask = [...todo];
    updatedtask.splice(index, 1);
    setTodo(updatedtask);
    saveTasks([...updatedtask]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    const isValidTitle = formValidation(title);
    if (!isValidTitle) {
      return;
    }
    if (editIndex !== null) {
      handleEditSubmit(event);
    } else {
      setTodo([...todo, { title }]);
      saveTasks([...todo, { title }]);
      setTitle("");
      setActive(false);
    }
  };

  const editTodo = (index) => {
    setEditIndex(index);
    setTitleEdit(todo[index].title);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setTitle("");
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    const isValidTitle = formValidation(titleEdit);
    if (!isValidTitle) {
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...todo];
      updatedTasks[editIndex].title = titleEdit;
      setEditIndex(null);
      setTodo(updatedTasks);
      saveTasks(updatedTasks);
      setTitleEdit("");
    }
  };

  const loadTasks = () => {
    let loadedTasks = localStorage.getItem("todo");
    let tasks = JSON.parse(loadedTasks);

    if (tasks) {
      setTodo(tasks);
    }
  };

  const saveTasks = (todo) => {
    localStorage.setItem("todo", JSON.stringify(todo));
  };

  const handleBlur = (event) => {
    if (editIndex !== null) {
      handleEditSubmit(event);
    }
  };

  const handleActive = () => {
    setActive(true);
  };
  const handleActiveSubmit = () => {
    setActive(false);
  };

  useEffect(() => {
    loadTasks();

    const handleClickOutside = (event) => {
      if (
        isinputValid === false &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setInputValid(true);
      }

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        editInputRef.current &&
        !editInputRef.current.contains(event.target)
      ) {
        if (editIndex !== null) {
          handleEditSubmit(event);
        }

        cancelEdit();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [containerRef, editIndex]);

  return (
    <>
      <div className=" h-[44px] fixed top-0 w-[375px]   lg:w-full z-50 ">
        <img
          className=" fixed top-[12px] left-[21px] w-[54px] h-[21px]"
          src={TimeStyle}></img>

        <img
          className=" fixed w-[17px]  top-[17.67px] left-[293.67px] md:left-[88%]  h-[10.67px]"
          src={signal}
          alt=""
        />

        <img
          className="w-[15.27px] fixed top-[17.33px] left-[315.69px] md:left-[92%] h-[10.97px] "
          src={Wifi}
          alt=""
        />

        <img
          className="w-[24.33px] fixed top-[17.33px] left-[336px] md:left-[95%] h-[11.33px]"
          src={Battery}
          alt=""
        />
      </div>

      <div className="w-[375px] relative top-[44px] md:w-full md:h-full h-[860px]">
        <div className="w-[375px] flex md:justify-between h-[73px] md:w-full">
          <div
            id="today-title"
            className="w-[65px]  md:w-[40px] md:h-[40px] text-3xl font-bold relative top-[16px] left-[16px] h-[41px]">
            Today
          </div>
          <div className="w-[25px] h-[25px] md:w-[40px] md:h-[40px] relative top-[23px] left-[268px] md:left-[-3%]">
            <GrAddCircle
              onClick={handleActive}
              color="#006CFF"
              className="font-bold"
              size={30}
            />
          </div>
        </div>

        <div
          className="lg:w-full max-h-fit lg:h-screen "
          ref={containerRef}
          onClick={handleClick}>
          <div
            id="scrollbar"
            className="flex justify-center md:items-start  md:w-10/12 w-[375px] md:w-max-96 md:h-full flex-col md:flex-row items-center mx-auto  rounded-md lg:p-2">
            <div className=" max-h-96 md:max-h-98 overflow-y-auto  w-[375px] flex justify-center md:w-11/12  ">
              {todo.length === 0 ? (
                <>
                  <div className=" flex flex-col justify-evenly items-center md:w-full md:z-100   lg:h-3/6 sm:h-1/2 ">
                    <div className="font-sans lg:font-extrabold  md:text-5xl text-sm font-bold my-2">
                      My Tasks
                    </div>

                    <div className=" text-md text-slate-500 opacity-40 py-2 ">
                      {" "}
                      You have No Task
                    </div>
                  </div>
                </>
              ) : (
                <div className=" left-10 lg:w-11/12 w-full max-h-fit">
                  <div className=" md:w-full w-[375px]">
                    <div className="flex justify-center text-sm md:text-xl font-semibold mt-4  lg:gap-4 gap-2 ">
                      <label className="px-2 md:px-5 " htmlFor="All">
                        <RadioButton
                          label="All"
                          value="all"
                          checked={filter === "all"}
                          onChange={() => handleFilterChange("all")}
                        />
                      </label>

                      <label className="px-2 md:px-5 " htmlFor="Complete">
                        <RadioButton
                          className="px-2 md:px-10"
                          label="Complete"
                          value="complete"
                          checked={filter === "complete"}
                          onChange={() => handleFilterChange("complete")}
                        />
                      </label>
                      <label className="px-2 md:px-5 " htmlFor="Incomplete">
                        <RadioButton
                          label="Incomplete"
                          value="incomplete"
                          checked={filter === "incomplete"}
                          onChange={() => handleFilterChange("incomplete")}
                        />{" "}
                      </label>
                    </div>
                    {isinputValid === false && (
                      <div className="text-red-600">
                        Please enter a valid task name
                      </div>
                    )}
                  </div>

                  <div className="mt-10 ">
                    {filteredTodo().map((item, index) => (
                      <div className=" max-h-fit" key={index}>
                        <div className="flex lg:mx-2 lg:gap-2 gap-0 flex-col">
                          <div
                            ref={editIndex === index ? editInputRef : null}
                            className="flex max-h-fit  my-2  w-full md:w-10/12 rounded-md justify-between md:py-1 md:px-1">
                            {editIndex === index ? (
                              <>
                                <div className="flex w-[300px] flex-col">
                                  <form onSubmit={(e) => handleEditSubmit(e)}>
                                    <input
                                      id="inputbar"
                                      ref={inputRef}
                                      className="w-10/12 h-8 rounded-md p-2 mt-2 ml-12 border-2 text-black"
                                      placeholder="Task..."
                                      onChange={(e) =>
                                        setTitleEdit(e.target.value)
                                      }
                                      onBlur={handleBlur}
                                      value={titleEdit}
                                    />
                                  </form>
                                </div>
                              </>
                            ) : (
                              <div className="flex w-[375px] flex-row lg:mx-2 lg:gap-2 gap-0 lg:flex-col">
                                <div className="pl-2 ">
                                  {filter === "all" ? (
                                    <Checkboxbutton
                                      className=" h-[28px] w-[28px] border-2 rounded-[50%] p-0 align-middle"
                                      checked={checkedItems[index] || false}
                                      onChange={() =>
                                        handleCheckboxChange(index)
                                      }
                                    />
                                  ) : null}
                                </div>
                                <div
                                  id="protext"
                                  className="  pl-4 max-h-fit md:font-medium font-sfpro md:text-lg">
                                  {item.title}
                                </div>
                              </div>
                            )}

                            <div className="h-10 w-10 pl-30">
                              {checkedItems[index] == true &&
                              filter === "all" ? (
                                <>
                                  <li className="text-green-600 text-3xl pl-8"></li>
                                </>
                              ) : (
                                <li className="text-red-600 text-3xl pl-8"></li>
                              )}
                            </div>

                            <div className="flex w-[75px] flex-col md:flex-row ml-4 md:mt-1">
                              <>
                                <RiDeleteBin5Fill
                                  className="m-1"
                                  color="red"
                                  opacity={0.6}
                                  size={25}
                                  style={{ cursor: "pointer" }}
                                  onClick={() => deleteTodo(index)}
                                />
                              </>

                              <RiEditBoxLine
                                className="m-1"
                                ref={editInputRef}
                                opacity={0.6}
                                size={25}
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                  editIndex === index
                                    ? handleEditSubmit()
                                    : editTodo(index)
                                }
                              />
                            </div>
                          </div>
                          <div className="h-[1px] border-1 border-zinc-200 ml-[50px] w-[325px]"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {isactive == true ? (
              <div className=" absolute top-[150px] border-2 bg-white rounded-md flex flex-col w-[340.62px] h-[297.24px] justify-center ">
                <form
                  className="h-[200px] w-full ml-4"
                  name="todoform"
                  onSubmit={handleSubmit}>
                  {" "}
                  <div className=" w-[87px] h-[41px] font-bold left-[30px] top-[109px] text-[18px] leading-[41px] tracking-[1%]">
                    Add Todo
                  </div>
                  <textarea
                    name="todoform"
                    id=""
                    cols="30"
                    type="text"
                    className="rounded-[10px] h-[148px] w-[298px] border-1 placeholder:text-start p-2"
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSubmit(e);
                      }
                    }}
                    value={title}
                    rows="10"></textarea>
                </form>
                <div className=" flex justify-between ml-4 w-[298px] h-[44px] text-sky-600">
                  <Button
                    type="text"
                    onClick={handleActiveSubmit}
                    className="bg-white text-skyblue">
                    {" "}
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-white font-medium text-skyblue">
                    {" "}
                    Done
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        <div className="w-[375px] md:w-full h-[34px] flex justify-center fixed bottom-0">
          <div className="h-[5px] w-[135px] bg-zinc-800"> </div>
        </div>
      </div>
    </>
  );
};

export default TodoItems;
