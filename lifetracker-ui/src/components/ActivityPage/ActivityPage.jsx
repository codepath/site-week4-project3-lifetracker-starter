import * as React from "react"
import "./ActivityPage.css"

export default function ActivityPage({appState, isLoggedIn}) {

    const authenticathedUser = 
    <>
    <h2>Hello 😁 {appState?.user?.firstName}</h2>
    <div class="ActivityPage css-ra15rn">
    <div class="chakra-container css-1m340o4">
        <div class="chakra-stack css-12mzq72">
            <h2 class="chakra-heading css-1jb3vzl">Activity Feed</h2>
            <div class="chakra-stack css-1qwhsm9" >
                <button type="button" class="chakra-button css-moltat">Add Exercise</button><button type="button" class="chakra-button css-l6faz9">Log Sleep</button>
                <button type="button" class="chakra-button css-n3canj">Record Nutrition</button>
            </div>
        </div>
        <div class="css-18qrtb8">
            <div class="css-xkuesw">
                <div class="chakra-stack css-12mzq72">
                    <div class="chakra-stack css-8g8ihq">
                        <h2 class="chakra-heading css-18j379d">Total Exercise Minutes</h2>
                        <h2 class="chakra-heading css-1gipxey"></h2>
                    </div>
                    <div class="chakra-stack css-1qwhsm9" ></div>
                </div>
                <div class="css-0">
                    <div class="css-1lekzkb">
                        <p class="chakra-text css-51dhyc">50.0</p>
                        <div class="chakra-stack css-tl3ftk">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" focusable="false" class="chakra-icon css-9dla43" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
                                ></path>
                            </svg>
                            <span class="chakra-badge css-1g1qw76">+2.5%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="css-1k6gjzc">
                <div class="chakra-stack css-12mzq72">
                    <div class="chakra-stack css-8g8ihq">
                        <h2 class="chakra-heading css-18j379d">Average Hours of Sleep</h2>
                        <h2 class="chakra-heading css-1gipxey"></h2>
                    </div>
                    <div class="chakra-stack css-1qwhsm9" ></div>
                </div>
                <div class="css-0">
                    <div class="css-1lekzkb">
                        <p class="chakra-text css-51dhyc">0.0</p>
                        <div class="chakra-stack css-tl3ftk">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" focusable="false" class="chakra-icon css-9dla43" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                                ></path>
                            </svg>
                            <span class="chakra-badge css-1bbbzfs">-2.5%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="css-btgv56">
                <div class="chakra-stack css-12mzq72">
                    <div class="chakra-stack css-8g8ihq">
                        <h2 class="chakra-heading css-18j379d">Average Daily Calories</h2>
                        <h2 class="chakra-heading css-1gipxey"></h2>
                    </div>
                    <div class="chakra-stack css-1qwhsm9"></div>
                </div>
                <div class="css-0">
                    <div class="css-1lekzkb">
                        <p class="chakra-text css-51dhyc">0.00</p>
                        <div class="chakra-stack css-tl3ftk">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" focusable="false" class="chakra-icon css-9dla43" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z"
                                ></path>
                            </svg>
                            <span class="chakra-badge css-1g1qw76">+5.5%</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="css-qr0fjv">
                <div class="chakra-stack css-12mzq72">
                    <div class="chakra-stack css-8g8ihq">
                        <h2 class="chakra-heading css-18j379d">More Stats</h2>
                        <h2 class="chakra-heading css-1gipxey"></h2>
                    </div>
                    <div class="chakra-stack css-1qwhsm9"></div>
                </div>
                <div class="css-0">
                    <div role="group" class="chakra-stat__group css-fxvpvo">
                        <div class="chakra-stat css-1mbo1ls">
                            <dl>
                                <dt class="chakra-stat__label css-14go5ty">Max Calories In One Meal</dt>
                                <dd class="chakra-stat__number css-1axeus7">0.0</dd>
                            </dl>
                        </div>
                        <div class="chakra-stat css-1mbo1ls">
                            <dl>
                                <dt class="chakra-stat__label css-14go5ty">Average Exercise Intensity</dt>
                                <dd class="chakra-stat__number css-1axeus7">3.0</dd>
                            </dl>
                        </div>
                        <div class="chakra-stat css-1mbo1ls">
                            <dl>
                                <dt class="chakra-stat__label css-14go5ty">Total Number of Hours Slept</dt>
                                <dd class="chakra-stat__number css-1axeus7">0.0</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="css-8inehh"></div>
    </div>
</div>
    </>
    const noAuthenticated =
    <>
    <h2 className="noAuthenticated"> Only authenticated users can view this page</h2>
    </>

    return (
      <div className="ActivityPage">

        {isLoggedIn ? authenticathedUser : noAuthenticated}

        
  
        
      </div>
    )
  }