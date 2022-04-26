import React from "react"
import styles from "./Animate.module.css"

export const Animate =
  <P extends object>(animation: "tada" | "wobble") =>
  (BaseComponent: React.ComponentType<P>) =>
  (props: P) => {
    const [isHover, setHover] = React.useState(false)

    return (
      <div
        className={isHover ? (animation == "tada" ? styles.tadaAnimation : styles.wobbleAnimation) : ""}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <BaseComponent {...props} />
      </div>
    )
  }
