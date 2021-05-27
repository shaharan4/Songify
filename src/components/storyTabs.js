// import React from 'react';
// import ReactMotion from 'react-motion';
// // import ReactARIA from '@react-aria';

// const { Component, Children, PropTypes } = React
// // const { Motion, spring } = ReactMotion
// // const { AriaManager, AriaToggle, AriaPopover, AriaTabList, AriaTab, AriaPanel, AriaItem } = ReactARIA

// const fastSpring = { stiffness: 400, damping: 40 }

// class StoryTabs extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       tabs: [{
//         id: 't1',
//         title: <strong>🍗 Bacon Ipsum</strong>,
//         panel: <div><p>Bacon ipsum dolor amet pork prosciutto tail ground round cow pancetta ham beef.  Brisket cupim shoulder drumstick turkey sausage cow pork beef pig venison boudin.  Ham hock bacon hamburger alcatra boudin shank shankle porchetta short ribs.  Jowl shank shoulder, pork belly tail ham hock ribeye fatback sirloin doner beef swine ground round meatball hamburger.</p><p>Venison pork turkey jerky pig.  Kevin andouille pastrami, ham hock sausage landjaeger sirloin tri-tip spare ribs boudin kielbasa tenderloin bresaola.  Short loin ribeye biltong capicola salami tenderloin, fatback ground round rump sirloin meatloaf porchetta.  Pork loin alcatra short loin ham hock kevin salami beef ribs filet mignon leberkas.  Bresaola pork landjaeger, tail jowl t-bone corned beef.  Cupim ground round tail brisket, pork belly short loin t-bone.  Beef ribs pork chop kevin short ribs frankfurter alcatra ball tip ground round jerky.</p></div>
//       }, {
//         id: 't2',
//         title: <strong>👨🏿 Samuel Ipsum</strong>,
//         panel: <div><p>Now that we know who you are, I know who I am. I'm not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villain's going to be? He's the exact opposite of the hero. And most times they're friends, like you and me! I should've known way back when... You know why, David? Because of the kids. They called me Mr Glass.</p><p>Your bones don't break, mine do. That's clear. Your cells react to bacteria and viruses differently than mine. You don't get sick, I do. That's also clear. But for some reason, you and I react the exact same way to water. We swallow it too fast, we choke. We get some in our lungs, we drown. However unreal it may seem, we are connected, you and I. We're on the same curve, just on opposite ends.</p></div>
//       }, {
//         id: 't3',
//         title: <strong>💀 Zombie Ipsum</strong>,
//         panel: <div><p>Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia? De apocalypsi gorger omero undead survivor dictum mauris. Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby. The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus. Zonbi tattered for solum oculi eorum defunctis go lum cerebro.</p></div>
//       }],
//       activeId: 't1',
//       height: 'auto'
//     }
//     this._handleChange = this._handleChange.bind(this)
//   }

//   _handleChange(activeId) {
//     this.setState({ activeId })
//   }

//   render() {
//     const { tabs, activeId, height } = this.state
//     const activeIndex = tabs.indexOf(tabs.filter(tab => tab.id === activeId)[0])
    
//     return (
//       <AriaManager
//         type="tabs"
//         activeTabId={activeId}
//         onChange={this._handleChange}
//       >
//         <div className="tab-set">
//           <Measure>
//             { dimensions =>
//               <Motion
//                 style={{ x: spring(dimensions.width/3 * activeIndex, fastSpring) }}
//               >
//               { value =>
//                 <AriaTabList className="tab-list">
//                   { tabs.map(({ id, title }) =>
//                     <AriaTab
//                       key={id}
//                       id={id}
//                       isActive={id === activeId}
//                     >
//                       {(props, isActive) => (
//                         <div {...props} className={`tab-list-item ${isActive ? 'is-active' : ''}`}>
//                           {title}
//                         </div>
//                       )}
//                     </AriaTab>
//                   )}
//                   <div
//                     style={{
//                       width: dimensions.width/3,
//                       height: 2,
//                       background: '#a5acb1',
//                       position: 'absolute',
//                       bottom: 0,
//                       left: 0,
//                       transform: `translate3d(${value.x}px, 0, 0)`
//                     }}
//                   />
//                 </AriaTabList>
//               }
//               </Motion>
//             }
//           </Measure>
//           <div className="tab-panels">
//             <ReactFluidContainer
//               height="auto"
//               style={{ overflow: 'hidden' }}
//             >
//               <div>
//                 { tabs.map(({ id, panel }) =>
//                   <AriaPanel
//                     key={id}
//                     isActive={id === activeId}
//                     controlledBy={id}
//                     className="tab-panel"
//                   >
//                     {panel}
//                   </AriaPanel>
//                 )}
//               </div>
//             </ReactFluidContainer>
//           </div>
//         </div>
//       </AriaManager>
//     )
//   }
// }

// ReactDOM.render(<StoryTabs/>, document.getElementById('app'))