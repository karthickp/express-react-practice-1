function DogList({ dogs }) {

  if (dogs.length === 0) {
    return <p>No dogs found.</p>
  }

  return (
    <ul>
      {dogs.map((dog) => (
        <li key={dog.id}>
          <strong>{dog.name}</strong> - {dog.breed}, {dog.age} years old
        </li>
      ))}
    </ul>
  )
}

export default DogList
