import { useState } from "react"
import heroImg from "./assets/hero.png"
import reactLogo from "./assets/react.svg"
import viteLogo from "./assets/vite.svg"
import "./App.css"

function App() {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const [github, setGithub] = useState({
    text: "GitHub",
    icon: "/icons.svg#github-icon",
  })
  const [links, setLinks] = useState([
    {
      text: "GitHub",
      icon: "/icons.svg#github-icon",
    },
    {
      text: "Discord",
      icon: "/icons.svg#discord-icon",
    },
    {
      text: "X.com",
      icon: "/icons.svg#x-icon",
    },
    {
      text: "Bluesky",
      icon: "/icons.svg#bluesky-icon",
    },
  ])

  return (
    <>
      <section id="center">
        {isVisible && (
          <div className="hero">
            <img
              src={heroImg}
              className="base"
              width="170"
              height="179"
              alt=""
            />
            <img src={reactLogo} className="framework" alt="React logo" />
            <img src={viteLogo} className="vite" alt="Vite logo" />
          </div>
        )}

        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => {
            setCount((count) => count + 1)
            setCount((count) => count + 1)
            setCount((count) => count + 1)
          }}
        >
          Count is {count}
        </button>
      </section>

      <section
        style={{ display: "flex", justifyContent: "center", gap: "20px" }}
      >
        <button
          type="button"
          className="counter"
          onClick={() => {
            setIsVisible((isVisible) => !isVisible)
          }}
        >
          {isVisible ? "Hide Logo" : "Show Logo"}
        </button>
        <button
          type="button"
          className="counter"
          onClick={() => {
            setGithub({
              ...github,
              text: "My Github",
            })
          }}
        >
          "My Github"
        </button>
      </section>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            {links.map((link) => (
              <li>
                <a href="https://github.com/vitejs/vite" target="_blank">
                  <svg
                    className="button-icon"
                    role="presentation"
                    aria-hidden="true"
                  >
                    <use href={link.icon}></use>
                  </svg>
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App