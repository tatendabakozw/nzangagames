import React from 'react'
import { FaGithub } from 'react-icons/fa';

type Props = {
    onClick: () => void,
    loading: boolean
}

const GithubButton = ({onClick, loading}: Props) => {
  return (
    <div className="flex">
    <button
      onClick={loading ? () => console.log('button is loading') : onClick}
      className="bg-slate-900 flex flex-row items-center space-x-2 py-2 px-3 rounded-lg text-sm font-medium text-white"
    >
      <FaGithub />
      <p>{loading ? 'Loading ...' : 'Github'}</p>
    </button>
  </div>
  )
}

export default GithubButton