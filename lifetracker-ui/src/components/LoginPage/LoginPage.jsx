import * as React from "react";
import "./LoginPage.css";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="LoginPage">
      <div class="css-9cjjy5">
        <div class="chakra-stack css-15xvz01">
          <span class="chakra-avatar css-11g7hql">
            <svg
              viewBox="0 0 128 128"
              class="chakra-avatar__svg css-16ite8i"
              role="img"
              aria-label=" avatar"
            >
              <path
                fill="currentColor" d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
              ></path>
              <path
                fill="currentColor" d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
              ></path>
            </svg>
          </span>
          <h2 class="chakra-heading css-3q8efk">Welcome</h2>
          <div class="css-ebzegt">
            <form>
              <div class="chakra-stack css-1opnp10">
                <div role="group" class="chakra-form-control css-1kxonj9">
                  <div class="chakra-input__group css-bx0blc" data-group="true">
                    <div class="chakra-input__left-element css-1cw84h2">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 512 512"
                        class="css-119zpey"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"></path>
                      </svg>
                    </div>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      id="field-:re:"
                      required=""
                      aria-required="true"
                      class="chakra-input css-trvw4f"
                      value=""
                    />
                  </div>
                </div>
                <div role="group" class="chakra-form-control css-1kxonj9">
                  <div class="chakra-input__group css-bx0blc" data-group="true">
                    <div class="chakra-input__left-element css-17ke578">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 448 512"
                        class="css-119zpey"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                      </svg>
                    </div>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      id="field-:rf:"
                      required=""
                      aria-required="true"
                      class="chakra-input css-67vh0"
                      value=""
                    />
                    <div class="chakra-input__right-element css-1qww07b">
                      <button type="button" class="chakra-button show-button">
                        Show
                      </button>
                    </div>
                  </div>
                </div>
                <button type="submit" class="chakra-button css-4lvvxn">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="footer">
          New to us?{" "}
          <Link to="/register">
          <a class="sign-up">
            Sign Up
          </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
