import React from 'react';
import styled from 'styled-components'
import './TapToDonate.css'
const CenterWrapper = styled.div`
position:absolute;
top:25%;
left:25%;
text-align:center
`
const TapToDonate = React.forwardRef((props, ref) => {
    function hideTapToDonate() {
        props.setShowTapToDonate(false);
    }
    return (
        <div {...props} ref={ref} onClick={hideTapToDonate}>
            <div  class="page">
                <div class="perant">
                    <div class="card"><h1 className='header'>tap to donate</h1>
                        <div className='img'>
                            <div class="Arc Out">
                                <div class="Arc Middle">
                                    <div class="Arc In">
                                        <div class="Arc Dot">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
})
export default TapToDonate;