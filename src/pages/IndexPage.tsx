import React from 'react'

const IndexPage = () => {
  return (
    <div className="bg-slate-200 flex flex-col space-y-5 p-5 h-fit w-[75%] shadow-xl rounded-2xl">
      <h2 className="text-2xl text-center">Tervetuloa Kokkinurkan pariin!</h2>
      <p>Kokkinurkan avulla pystyt lukemaan toisten käyttäjien palveluun lisäämiä reseptejä sekä lisäämään niitä itse. Sivusto hyödyntää MongoDB-tietokantaa reseptien
        tallentamista varten.
        Tämä suhteellisen yksinkertainen React-pohjainen webbisovellus ei ole tarkoitettu kaupallista käyttöä varten.</p>
      <h3 className="text-xl text-center">Sovelluksen käyttö</h3>
      <p>Kirjautumaton käyttäjä pystyy selaamaan sivulle lisättyjä reseptejä ja niihin lisättyjä kommentteja, mutta reseptin lisäämistä, niiden suosikiksi lisäämistä
        sekä kommentointia varten tulee palveluun rekisteröityä sekä kirjautua. Se käy helposti navigoinnin Rekisteröidy- sekä Kirjaudu-painikkeen kautta.
      </p>
    </div>
  )
}

export default IndexPage