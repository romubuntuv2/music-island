import BPMControler from "../../../models/BPMControler"
import GammeButton from "../../../models/GammeButton"
import Lever from "../../../models/Lever"


const EnvControls = () => {


  return <>
    <Lever/>

    <GammeButton type="reboot" />
    <GammeButton type="spawn"/>
    <GammeButton type="custom"/>

    <BPMControler />
  </>
}

export default EnvControls