import { TailSpin } from 'react-loader-spinner'
export default function Spinner({ color = "#FFF" }) {
    return (
        <div style={{position:"relative"}}>
            <TailSpin
                visible={true}
                height="150"
                width="150"
                color={color}
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}