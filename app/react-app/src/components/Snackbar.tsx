import { FC, useEffect, useState } from "react"
import './Snackbar.css'

const Snackbar: FC<{ message: string | undefined, isActive: boolean }> = ({ message, isActive }) => {
  return (
    <div>
      <div className={isActive ? 'snackbar show' : 'snackbar'}>
        {message}
      </div>
    </div>
  )
}
export default Snackbar


export function useSnackBar() {
  const [isActive, setIsActive] = useState<boolean>(false)
  const [msg, setMsg] = useState<string>()

  useEffect(() => {
    console.log('use effect')
    if (isActive == true) {
      console.log('setting snackbar show')
      setTimeout(() => {
        console.log('setting snackbar')
        setIsActive(false);
      }, 4000);
    }
  }, [isActive])

  const openSnackBar = (msg: string) => {
    setMsg(msg)
    setIsActive(true);
  }
  return { isActive, msg, openSnackBar }
}

// how to make snackbar
// https://medium.com/@farid12ansari7/snackbar-notification-using-custom-hooks-react-5fbfa586168b