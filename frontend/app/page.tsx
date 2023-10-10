import BooksTable from '@/components/Book/BooksTable'
import Header from '@/components/Header'
import UserDetails from '@/components/UserDetails'

export default function Home() {
  return (
    <main>
      <Header />
      <UserDetails />
      <BooksTable />

    </main>
  )
}
