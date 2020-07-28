import React, { useRef, useEffect } from 'react';
import './App.css';
function App() {
  const Background1 = useRef(null);
  const Background2 = useRef(null);
  const Foreground1 = useRef(null);
  const Foreground2 = useRef(null);
  const aliceAnimation = useRef(null);
  useEffect(() => {
    var sceneryFrames = [
      { transform: 'translateX(100%)' },
      { transform: 'translateX(-100%)' },
    ];

    var sceneryTimingBackground = {
      duration: 36000,
      iterations: Infinity,
    }

    var sceneryTimingForeground = {
      duration: 12000,
      iterations: Infinity,
    };

    const spriteFrames = [
      { transform: "translateY(0)" },
      { transform: "translateY(-100%)" }
    ]

    const firstBackgroundMovement = Background1.current.animate(sceneryFrames, sceneryTimingBackground);
    firstBackgroundMovement.currentTime = firstBackgroundMovement.effect.getTiming().duration / 2;

    const secondBackgroundMovement = Background2.current.animate(sceneryFrames, sceneryTimingBackground);

    const firstForegroundMovement = Foreground1.current.animate(sceneryFrames, sceneryTimingForeground);
    firstForegroundMovement.currentTime = firstForegroundMovement.effect.getTiming().duration / 2;

    const secondForegroundMovement = Foreground2.current.animate(sceneryFrames, sceneryTimingForeground);

    const aliceAnimationMovement = aliceAnimation.current.animate(spriteFrames, {
      easing: 'steps(7,end)',
      direction: 'reverse',
      duration: 600,
      playbackRate: 1,
      iterations: Infinity,
    });

    var wholescene = [firstForegroundMovement, secondForegroundMovement, firstBackgroundMovement, secondBackgroundMovement];

    const adjustPlaybackRate = () => {
      if(aliceAnimationMovement.playbackRate < .8) {
        wholescene.forEach((animation) => {
          animation.playbackRate = aliceAnimationMovement.playbackRate/2*-1;
        })
      } else if(aliceAnimationMovement.playbackRate > 1.2){
        wholescene.forEach((animation) => {
          animation.playbackRate = aliceAnimationMovement.playbackRate/2;
        })
      } else {
        wholescene.forEach((animation) => {
          animation.playbackRate = 0;
        })
      }
    }


    setInterval(() => {
      if (aliceAnimationMovement.playbackRate > .4) {
        aliceAnimationMovement.playbackRate *= .9;
      }
      adjustPlaybackRate();
    }, 3000)

    const goFaster = () => {
      aliceAnimationMovement.playbackRate *= 1.1;
      adjustPlaybackRate();
    }

    window.addEventListener("click", goFaster);
  })
  return (
    <div className="wrapper">
      <div className="sky"></div>
      <div className="earth">
        <div id="red-queen_and_alice">
          <img id="red-queen_and_alice_sprite" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/sprite_running-alice-queen.png 2x" alt="Alice and the Red Queen running to stay in place." ref={aliceAnimation} />
        </div>
      </div>
      <div className="scenery" id="foreground1" ref={Foreground1}>
        <img id="palm3" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm3.png 2x" alt=" " />
      </div>
      <div className="scenery" id="foreground2" ref={Foreground2}>
        <img id="bush" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/bush.png 2x" alt=" " />
        <img id="w_rook_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_upright.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background1" ref={Background1}>
        <img id="r_pawn_upright" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_upright.png 2x" alt=" " />
        <img id="w_rook" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/w_rook.png 2x" alt=" " />
        <img id="palm1" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm1.png 2x" alt=" " />
      </div>
      <div className="scenery" id="background2" ref={Background2}>
        <img id="r_pawn" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_pawn.png 2x" alt=" " />
        <img id="r_knight" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/r_knight.png 2x" alt=" " />
        <img id="palm2" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2_small.png" srcSet="https://s3-us-west-2.amazonaws.com/s.cdpn.io/641/palm2.png 2x" alt=" " />
      </div>
    </div>
  );
}

export default App;