import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Loader from './utils/Loader';
import Tooltip from './utils/Tooltip';

const Tasks = () => {

  const authState = useSelector(state => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = { url: "/tasks", method: "get", headers: { Authorization: authState.token } };
    fetchData(config, { showSuccessToast: false }).then(data => setTasks(data.tasks));
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);


  const handleDelete = (id) => {
    const config = { url: `/tasks/${id}`, method: "delete", headers: { Authorization: authState.token } };
    fetchData(config).then(() => fetchTasks());
  }


  return (
    <>
      <div className="my-2 tracking-wider mx-auto max-w-[700px] py-4">

        {tasks.length !== 0 && <h2 className='my-2 ml-2 md:ml-0 text-gray-700 font-bold text-3xl'>Your tasks ({tasks.length})</h2>}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (

              <div className='w-[600px] h-[300px] flex flex-col items-center justify-center gap-4'>
                <span>No tasks found</span>
                <Link to="/tasks/add" className="bg-blue-500 text-white duration-300 hover:bg-blue-600 font-medium rounded-2xl px-4 py-2">+ Add new task </Link>
              </div>

            ) : (
              tasks.map((task, index) => (
                <div key={task._id} className='bg-gray-50 place-content-between flex my-4 p-4 text-gray-600 rounded-2xl shadow-md'>
                  <div className='whitespace-pre text-gray-600 font-semibold'>● {task.description}</div>
                  <div className='flex'>

                    {/* <span className='font-semibold text-gray-600 text-xl'>Task #{index + 1}</span> */}

                    <Tooltip text={"Edit"} position={"top"}>
                      <Link to={`/tasks/${task._id}`} className='ml-auto mr-6 text-green-600 cursor-pointer'>
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                    </Tooltip>

                    <Tooltip text={"Delete"} position={"top"}>
                      <span className='text-red-500 mr-2 cursor-pointer' onClick={() => handleDelete(task._id)}>
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    </Tooltip>

                  </div>
                </div>
              ))

            )}
          </div>
        )}
      </div>
    </>
  )

}

export default Tasks