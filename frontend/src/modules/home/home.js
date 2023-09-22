import SimpleTopHeader from "../../components/top-header/simple-top-header"
import {CenterWrapper} from "../../styles/wrapper-components"

export default function Home(){
    return (
        <>
            <SimpleTopHeader></SimpleTopHeader>
            <CenterWrapper>
                <h3> Please enter serial number of Stripe reader in the address bar to load the configuration file.</h3>
            </CenterWrapper>
        </>
    )
}