"use client"
import React, { useState, useEffect, useRef } from "react"
import Overlay from "@/components/Overlay"
import Header from "@/components/Header"
import People from "@/components/People"
import Footer from "@/components/Footer"

export default function Home() {
  const showApi = "/api/show"
  const showId = "5c040f9c3090cc98f4822a21"

  const [show, setShow] = useState({})
  const [nominees, setNominees] = useState([])
  const [hoh, setHoh] = useState([])
  const [voters, setVoters] = useState([])
  const [overlay, setOverlay] = useState(false)
  const [evictedPerson, setEvictedPerson] = useState(null)

  // Use refs to keep track of current state inside event listener callbacks
  const overlayRef = useRef(overlay)
  overlayRef.current = overlay

  useEffect(() => {
    /* Get data from API */
    fetch(`${showApi}/${showId}/1`)
      .then(resp => resp.json())
      .then(data => {
        setShow(data.show || {})
        setNominees(data.nominees || [])
        setHoh(data.hoh || [])
        setVoters(data.voters || [])
      })
      .catch(error => {
        console.error("Error fetching show data:", error)
      })

    /* Add event listeners */
    const handleKeyDown = (e) => {
      if (overlayRef.current && e.keyCode === 27) {
        setOverlay(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const toggleOverlay = () => {
    setOverlay(prev => !prev)
  }

  const deleteVote = (person) => {
    if (!person) return person
    const updated = { ...person }
    delete updated.vote
    delete updated.voteId
    return updated
  }

  const compareVotes = (currentNominees, currentVoters) => {
    const activeVoters = currentVoters.filter(person => !person.is_evicted)
    let maxCount = activeVoters.length / 2 + 1
    maxCount = !(maxCount % 1 === 0) ? Math.floor(maxCount) : maxCount
    return currentNominees.find(nominee => nominee.voteCount >= maxCount)
  }

  const countVotes = (currentNominees, currentVoters) => {
    const updatedNominees = currentNominees.map(nominee => {
      const voteCount = currentVoters.filter(
        person => person.voteId === nominee.id && !person.is_evicted
      ).length
      return { ...nominee, voteCount }
    })

    const evictee = compareVotes(updatedNominees, currentVoters)

    setNominees(updatedNominees)
    if (evictee) {
      setEvictedPerson(evictee)
      setOverlay(true)
    } else {
      setEvictedPerson(null)
      setOverlay(false)
    }
  }

  const updateVotersList = (id, prevPerson, currentVoters) => {
    let list = [...currentVoters]
    if (prevPerson && prevPerson.id) {
      list.push(deleteVote(prevPerson))
    }
    list = list.filter(person => person.id !== id)
    list.sort((a, b) => a.id - b.id)

    // Remove voter votes on previous person
    return list.map(person => {
      if (prevPerson && person.voteId === prevPerson.id) {
        return deleteVote(person)
      }
      return person
    })
  }

  const updateGroup = (key, event) => {
    const type = event.type // 'hoh' or 'nominees'
    const id = event.value // selected person ID

    setVoters(prevVoters => {
      const selectedPerson = prevVoters.find(person => person.id === id)
      if (!selectedPerson) return prevVoters // Cannot select a non-voter

      let groupState
      let setGroupState
      if (type === "hoh") {
        groupState = [...hoh]
        setGroupState = setHoh
      } else {
        groupState = [...nominees]
        setGroupState = setNominees
      }

      const prevPerson = groupState[key]
      groupState[key] = selectedPerson
      setGroupState(groupState)

      const updatedVoters = updateVotersList(id, prevPerson, prevVoters)

      // Recount votes with updated lists
      setTimeout(() => {
        if (type === "hoh") {
          countVotes(nominees, updatedVoters)
        } else {
          countVotes(groupState, updatedVoters)
        }
      }, 0)

      return updatedVoters
    })
  }

  const updateVote = (key, event) => {
    setVoters(prevVoters => {
      const updatedVoters = prevVoters.map(person => {
        if (person.id === event.personId) {
          return {
            ...person,
            vote: event.value,
            voteId: event.id
          }
        }
        return person
      })

      setTimeout(() => {
        countVotes(nominees, updatedVoters)
      }, 0)

      return updatedVoters
    })
  }

  const toggleEviction = (e) => {
    const voterId = parseInt(e.target.name, 10)
    setVoters(prevVoters => {
      const updatedVoters = prevVoters.map(voter => {
        if (voter.id === voterId) {
          const updated = {
            ...voter,
            is_evicted: !voter.is_evicted
          }
          delete updated.vote
          delete updated.voteId
          return updated
        }
        return voter
      })

      setTimeout(() => {
        countVotes(nominees, updatedVoters)
      }, 0)

      return updatedVoters
    })
  }

  return (
    <>
      <Overlay
        evictedPerson={evictedPerson}
        overlay={overlay}
        toggleOverlay={toggleOverlay}
        people={voters}
        show={show}
      />

      <Header />
      <div className="board">
        <div className="board-leaderboard">
          {hoh.length > 0 && (
            <People
              title={show.leaderTitle}
              type="hoh"
              people={hoh}
              nominees={nominees}
              onChange={updateGroup}
              voters={voters}
            />
          )}
          {nominees.length > 0 && (
            <People
              title={show.nomineesTitle}
              type="nominees"
              people={nominees}
              hoh={hoh}
              onChange={updateGroup}
              voters={voters}
            />
          )}
        </div>

        <div className="board-people">
          {voters.length > 0 && (
            <People
              title={show.peopleTitle}
              type="voters"
              people={voters}
              onChange={updateVote}
              nominees={nominees}
              toggleEviction={toggleEviction}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
