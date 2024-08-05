import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Chapters from './components/Chapters';
import Lessons from './components/LessonsList';
import 'flowbite';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "book/:bookId",
    element: <Chapters />,
  },
  {
    path: "chapitres/:chapterId",
    element: <Lessons />,
  },
]);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
