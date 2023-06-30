import './ExercisePage.css'

export default function ExercisePage(loggedIn) {
    return (
        !loggedIn? (
        <div className="ExercisePage css-ra15rn">
       <div className="chakra-container css-1m340o4">
          <h2 className="chakra-heading css-1dklj6k">Log in to see your data.</h2>
       </div>
    </div>
        ) : (
         <div className="ExercisePage css-ra15rn">
            <h1>To be done</h1>
            </div>
//             <div className="ExercisePage css-1bpnzr3">
//    <div className="css-19cns6y">
//       <div className="chakra-stack css-1cgbrw5">
//          <h2 className="chakra-heading css-b5coes">Exercise</h2>
//       </div>
//    </div>
//    <div className="css-vpbd2d">
//       <div className="css-0">
//          <div className="css-pwgvc2">
//             <div className="chakra-stack css-1jtnem3">
//                <div className="css-1hv8zgx">
//                   <div></div>
//                   <div className="css-mlsaez">
//                      <div className="chakra-stack css-13ra036">
//                         <h2 className="chakra-heading css-g56s2a">Record Exercise</h2>
//                         <div className="css-ebzegt">
//                            <form>
//                               <div className="chakra-stack css-1db3zf7">
//                                  <div role="group" className="chakra-form-control css-1kxonj9">
//                                     <div className="chakra-input__group css-bx0blc" data-group="true"><input name="name" type="text" placeholder="Name" id="field-:r12:" required aria-required="true" className="chakra-input css-p20xy6" value="" style="background-image: url(&quot;data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAfBJREFUWAntVk1OwkAUZkoDKza4Utm61iP0AqyIDXahN2BjwiHYGU+gizap4QDuegWN7lyCbMSlCQjU7yO0TOlAi6GwgJc0fT/fzPfmzet0crmD7HsFBAvQbrcrw+Gw5fu+AfOYvgylJ4TwCoVCs1ardYTruqfj8fgV5OUMSVVT93VdP9dAzpVvm5wJHZFbg2LQ2pEYOlZ/oiDvwNcsFoseY4PBwMCrhaeCJyKWZU37KOJcYdi27QdhcuuBIb073BvTNL8ln4NeeR6NRi/wxZKQcGurQs5oNhqLshzVTMBewW/LMU3TTNlO0ieTiStjYhUIyi6DAp0xbEdgTt+LE0aCKQw24U4llsCs4ZRJrYopB6RwqnpA1YQ5NGFZ1YQ41Z5S8IQQdP5laEBRJcD4Vj5DEsW2gE6s6g3d/YP/g+BDnT7GNi2qCjTwGd6riBzHaaCEd3Js01vwCPIbmWBRx1nwAN/1ov+/drgFWIlfKpVukyYihtgkXNp4mABK+1GtVr+SBhJDbBIubVw+Cd/TDgKO2DPiN3YUo6y/nDCNEIsqTKH1en2tcwA9FKEItyDi3aIh8Gl1sRrVnSDzNFDJT1bAy5xpOYGn5fP5JuL95ZjMIn1ya7j5dPGfv0A5eAnpZUY3n5jXcoec5J67D9q+VuAPM47D3XaSeL4AAAAASUVORK5CYII=&quot;); background-repeat: no-repeat; background-attachment: scroll; background-size: 16px 18px; background-position: 98% 50%; cursor: auto;"></div>
//                                  </div>
//                                  <div role="group" className="chakra-form-control css-1kxonj9">
//                                     <label id="field-:r13:-label" for="field-:r13:" className="chakra-form__label css-g6pte">Category<span role="presentation" aria-hidden="true" className="chakra-form__required-indicator css-1tfjd1n">*</span></label>
//                                     <div className="chakra-select__wrapper css-42b2qy">
//                                        <select name="category" id="field-:r13:" required="" aria-required="true" className="chakra-select css-1gpsbw3">
//                                           <option value="">Select a category</option>
//                                           <option value="run">Run</option>
//                                           <option value="bike">Bike</option>
//                                           <option value="lift">Lift</option>
//                                           <option value="swim">Swim</option>
//                                           <option value="sports">Sports</option>
//                                        </select>
//                                        <div className="chakra-select__icon-wrapper css-iohxn1">
//                                           <svg viewBox="0 0 24 24" role="presentation" className="chakra-select__icon" focusable="false" aria-hidden="true" style="width: 1em; height: 1em; color: currentcolor;">
//                                              <path fill="currentColor" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
//                                           </svg>
//                                        </div>
//                                     </div>
//                                  </div>
//                                  <div className="css-9jay18">
//                                     <div role="group" className="chakra-form-control css-1kxonj9">
//                                        <label id="field-:r14:-label" for="field-:r14:" className="chakra-form__label css-g6pte">Duration (min)<span role="presentation" aria-hidden="true" className="chakra-form__required-indicator css-1tfjd1n">*</span></label>
//                                        <div value="" className="chakra-numberinput css-3e5t3k">
//                                           <input name="duration" inputmode="decimal" type="text" pattern="[0-9]*(.[0-9]+)?" id="field-:r14:" aria-readonly="false" aria-required="true" required="" role="spinbutton" aria-valuemin="1" aria-valuemax="100" autocomplete="off" autocorrect="off" className="chakra-numberinput__field css-1551roq" value="">
//                                           <div aria-hidden="true" className="css-1jj9yua">
//                                              <div role="button" tabindex="-1" className="css-1m5jnul">
//                                                 <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon css-onkibi">
//                                                    <path fill="currentColor" d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"></path>
//                                                 </svg>
//                                              </div>
//                                              <div role="button" tabindex="-1" className="css-1m5jnul">
//                                                 <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon css-onkibi">
//                                                    <path fill="currentColor" d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"></path>
//                                                 </svg>
//                                              </div>
//                                           </div>
//                                        </div>
//                                     </div>
//                                     &nbsp;
//                                     <div role="group" className="chakra-form-control css-1kxonj9">
//                                        <label id="field-:r15:-label" for="field-:r15:" className="chakra-form__label css-g6pte">Intensity<span role="presentation" aria-hidden="true" className="chakra-form__required-indicator css-1tfjd1n">*</span></label>
//                                        <div value="1" className="chakra-numberinput css-3e5t3k">
//                                           <input name="intensity" inputmode="decimal" type="text" pattern="[0-9]*(.[0-9]+)?" id="field-:r15:" aria-readonly="false" aria-required="true" required="" role="spinbutton" aria-valuemin="1" aria-valuemax="10" aria-valuenow="1" aria-valuetext="1" autocomplete="off" autocorrect="off" className="chakra-numberinput__field css-1551roq" value="1">
//                                           <div aria-hidden="true" className="css-1jj9yua">
//                                              <div role="button" tabindex="-1" className="css-1m5jnul">
//                                                 <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon css-onkibi">
//                                                    <path fill="currentColor" d="M12.8,5.4c-0.377-0.504-1.223-0.504-1.6,0l-9,12c-0.228,0.303-0.264,0.708-0.095,1.047 C2.275,18.786,2.621,19,3,19h18c0.379,0,0.725-0.214,0.895-0.553c0.169-0.339,0.133-0.744-0.095-1.047L12.8,5.4z"></path>
//                                                 </svg>
//                                              </div>
//                                              <div role="button" tabindex="-1" disabled="" aria-disabled="true" className="css-1m5jnul">
//                                                 <svg viewBox="0 0 24 24" focusable="false" className="chakra-icon css-onkibi">
//                                                    <path fill="currentColor" d="M21,5H3C2.621,5,2.275,5.214,2.105,5.553C1.937,5.892,1.973,6.297,2.2,6.6l9,12 c0.188,0.252,0.485,0.4,0.8,0.4s0.611-0.148,0.8-0.4l9-12c0.228-0.303,0.264-0.708,0.095-1.047C21.725,5.214,21.379,5,21,5z"></path>
//                                                 </svg>
//                                              </div>
//                                           </div>
//                                        </div>
//                                     </div>
//                                  </div>
//                                  <button type="submit" className="chakra-button css-4lvvxn">Save</button>
//                               </div>
//                            </form>
//                         </div>
//                      </div>
//                   </div>
//                   <div></div>
//                </div>
//             </div>
//          </div>
//       </div>
//    </div>
// </div>
       )
        )
    }