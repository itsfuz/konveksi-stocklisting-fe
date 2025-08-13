"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Motif {
  id: string
  motifCode: string
  motifName: string
}

interface MotifForm {
  motifCode: string
  motifName: string
}

interface CMT {
  id: string
  tukangPotongCode: string
  tukangPotongName: string
  cmtCode: string
  cmtName: string
}

interface CMTForm {
  tukangPotongCode: string
  tukangPotongName: string
  cmtCode: string
  cmtName: string
}

interface Artikel {
  id: string
  motifCode: string
  artikelCode: string
  artikelName: string
}

interface ArtikelForm {
  selectedMotifId: string
  artikelCodeSuffix: string
  artikelName: string
}

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState<string>("")
  const [motifs, setMotifs] = useState<Motif[]>([])
  const [cmts, setCmts] = useState<CMT[]>([])
  const [artikels, setArtikels] = useState<Artikel[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [motifCurrentPage, setMotifCurrentPage] = useState(1)
  const [cmtCurrentPage, setCmtCurrentPage] = useState(1)
  const [artikelCurrentPage, setArtikelCurrentPage] = useState(1)
  const itemsPerPage = 5

  const [editingMotif, setEditingMotif] = useState<string | null>(null)
  const [deleteMotifId, setDeleteMotifId] = useState<string | null>(null)

  const [editingCmt, setEditingCmt] = useState<string | null>(null)
  const [deleteCmtId, setDeleteCmtId] = useState<string | null>(null)

  const [editingArtikel, setEditingArtikel] = useState<string | null>(null)
  const [deleteArtikelId, setDeleteArtikelId] = useState<string | null>(null)

  const [artikelForm, setArtikelForm] = useState<ArtikelForm>({
    selectedMotifId: "",
    artikelCodeSuffix: "",
    artikelName: "",
  })

  const navItems = ["Dashboard", "Master Motif", "Master Tukang Potong / CMT", "Master Artikel", "PO", "Setoran"]

  const fetchMotifs = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setMotifs([
        { id: "1", motifCode: "M01", motifName: "Floral Pattern" },
        { id: "2", motifCode: "M02", motifName: "Geometric Design" },
        { id: "3", motifCode: "M03", motifName: "Abstract Art" },
        { id: "4", motifCode: "M04", motifName: "Striped Design" },
        { id: "5", motifCode: "M05", motifName: "Polka Dot Pattern" },
        { id: "6", motifCode: "M06", motifName: "Traditional Batik" },
        { id: "7", motifCode: "M07", motifName: "Modern Stripes" },
        { id: "8", motifCode: "M08", motifName: "Vintage Roses" },
        { id: "9", motifCode: "M09", motifName: "Tropical Leaves" },
        { id: "10", motifCode: "M10", motifName: "Ocean Waves" },
        { id: "11", motifCode: "M11", motifName: "Mountain View" },
        { id: "12", motifCode: "M12", motifName: "City Lights" },
        { id: "13", motifCode: "M13", motifName: "Forest Green" },
        { id: "14", motifCode: "M14", motifName: "Desert Sand" },
      ])
    } catch (error) {
      console.error("Error fetching motifs:", error)
      setMotifs([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchCmts = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCmts([
        {
          id: "1",
          tukangPotongCode: "TP1",
          tukangPotongName: "Ahmad Sutrisno",
          cmtCode: "C01",
          cmtName: "CMT Jakarta Pusat",
        },
        {
          id: "2",
          tukangPotongCode: "TP2",
          tukangPotongName: "Budi Santoso",
          cmtCode: "C02",
          cmtName: "CMT Bandung Timur",
        },
        {
          id: "3",
          tukangPotongCode: "TP3",
          tukangPotongName: "Sari Dewi",
          cmtCode: "C03",
          cmtName: "CMT Surabaya Selatan",
        },
        {
          id: "4",
          tukangPotongCode: "TP4",
          tukangPotongName: "Eko Prasetyo",
          cmtCode: "C04",
          cmtName: "CMT Yogyakarta",
        },
        {
          id: "5",
          tukangPotongCode: "TP5",
          tukangPotongName: "Citra Dewi",
          cmtCode: "C05",
          cmtName: "CMT Surabaya",
        },
        {
          id: "6",
          tukangPotongCode: "TP6",
          tukangPotongName: "Fitri Handayani",
          cmtCode: "C06",
          cmtName: "CMT Medan",
        },
        {
          id: "7",
          tukangPotongCode: "TP7",
          tukangPotongName: "Gunawan Lim",
          cmtCode: "C07",
          cmtName: "CMT Makassar",
        },
        {
          id: "8",
          tukangPotongCode: "TP8",
          tukangPotongName: "Hendra Wijaya",
          cmtCode: "C08",
          cmtName: "CMT Palembang",
        },
        {
          id: "9",
          tukangPotongCode: "TP9",
          tukangPotongName: "Indira Sari",
          cmtCode: "C09",
          cmtName: "CMT Denpasar",
        },
        {
          id: "10",
          tukangPotongCode: "T10",
          tukangPotongName: "Joko Susilo",
          cmtCode: "C10",
          cmtName: "CMT Malang",
        },
        {
          id: "11",
          tukangPotongCode: "T11",
          tukangPotongName: "Kartika Putri",
          cmtCode: "C11",
          cmtName: "CMT Solo",
        },
        {
          id: "12",
          tukangPotongCode: "T12",
          tukangPotongName: "Lukman Hakim",
          cmtCode: "C12",
          cmtName: "CMT Balikpapan",
        },
      ])
    } catch (error) {
      console.error("Error fetching CMTs:", error)
      setCmts([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchArtikels = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setArtikels([
        { id: "1", motifCode: "M01", artikelCode: "M01001", artikelName: "Floral Shirt" },
        { id: "2", motifCode: "M01", artikelCode: "M01002", artikelName: "Floral Dress" },
        { id: "3", motifCode: "M02", artikelCode: "M02001", artikelName: "Geometric Blouse" },
        { id: "4", motifCode: "M02", artikelCode: "M02002", artikelName: "Geometric Pants" },
        { id: "5", motifCode: "M03", artikelCode: "M03001", artikelName: "Abstract Jacket" },
        { id: "6", motifCode: "M03", artikelCode: "M03002", artikelName: "Abstract Skirt" },
        { id: "7", motifCode: "M04", artikelCode: "M04001", artikelName: "Striped T-Shirt" },
        { id: "8", motifCode: "M04", artikelCode: "M04002", artikelName: "Striped Shorts" },
        { id: "9", motifCode: "M05", artikelCode: "M05001", artikelName: "Polka Dot Top" },
        { id: "10", motifCode: "M05", artikelCode: "M05002", artikelName: "Polka Dot Scarf" },
        { id: "11", motifCode: "M06", artikelCode: "M06001", artikelName: "Batik Traditional" },
        { id: "12", motifCode: "M06", artikelCode: "M06002", artikelName: "Batik Modern" },
      ])
    } catch (error) {
      console.error("Error fetching artikels:", error)
      setArtikels([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const motifForm = { motifCode: "", motifName: "" }
    if (!motifForm.motifCode.trim() || !motifForm.motifName.trim()) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingMotif) {
        setMotifs((prev) =>
          prev.map((motif) =>
            motif.id === editingMotif
              ? { ...motif, motifCode: motifForm.motifCode, motifName: motifForm.motifName }
              : motif,
          ),
        )
      } else {
        const newMotif: Motif = {
          id: Date.now().toString(),
          motifCode: motifForm.motifCode,
          motifName: motifForm.motifName,
        }
        setMotifs((prev) => [...prev, newMotif])
      }

      setEditingMotif(null)
    } catch (error) {
      console.error("Error saving motif:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCmtSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cmtForm = { tukangPotongCode: "", tukangPotongName: "", cmtCode: "", cmtName: "" }
    if (
      !cmtForm.tukangPotongCode.trim() ||
      !cmtForm.tukangPotongName.trim() ||
      !cmtForm.cmtCode.trim() ||
      !cmtForm.cmtName.trim()
    )
      return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (editingCmt) {
        setCmts((prev) => prev.map((cmt) => (cmt.id === editingCmt ? { ...cmt, ...cmtForm } : cmt)))
      } else {
        const newCmt: CMT = {
          id: Date.now().toString(),
          ...cmtForm,
        }
        setCmts((prev) => [...prev, newCmt])
      }

      setEditingCmt(null)
    } catch (error) {
      console.error("Error saving CMT:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdate = (motif: Motif) => {
    setEditingMotif(motif.id)
  }

  const handleCmtUpdate = (cmt: CMT) => {
    setEditingCmt(cmt.id)
  }

  const handleDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setMotifs((prev) => prev.filter((motif) => motif.id !== id))
    } catch (error) {
      console.error("Error deleting motif:", error)
    } finally {
      setIsLoading(false)
      setDeleteMotifId(null)
    }
  }

  const handleCmtDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      setCmts((prev) => prev.filter((cmt) => cmt.id !== id))
    } catch (error) {
      console.error("Error deleting CMT:", error)
    } finally {
      setIsLoading(false)
      setDeleteCmtId(null)
    }
  }

  const handleArtikelSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!artikelForm.selectedMotifId || !artikelForm.artikelCodeSuffix.trim() || !artikelForm.artikelName.trim()) {
      return
    }

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const selectedMotif = motifs.find((m) => m.id === artikelForm.selectedMotifId)
      if (!selectedMotif) return

      const fullArtikelCode = selectedMotif.motifCode + artikelForm.artikelCodeSuffix

      if (editingArtikel) {
        setArtikels((prev) =>
          prev.map((artikel) =>
            artikel.id === editingArtikel
              ? {
                  ...artikel,
                  motifCode: selectedMotif.motifCode,
                  artikelCode: fullArtikelCode,
                  artikelName: artikelForm.artikelName,
                }
              : artikel,
          ),
        )
        setEditingArtikel(null)
      } else {
        const newArtikel: Artikel = {
          id: Date.now().toString(),
          motifCode: selectedMotif.motifCode,
          artikelCode: fullArtikelCode,
          artikelName: artikelForm.artikelName,
        }
        setArtikels((prev) => [...prev, newArtikel])
      }

      setArtikelForm({
        selectedMotifId: "",
        artikelCodeSuffix: "",
        artikelName: "",
      })
    } catch (error) {
      console.error("Error saving artikel:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleArtikelUpdate = (artikel: Artikel) => {
    const motif = motifs.find((m) => m.motifCode === artikel.motifCode)
    if (motif) {
      setArtikelForm({
        selectedMotifId: motif.id,
        artikelCodeSuffix: artikel.artikelCode.substring(3),
        artikelName: artikel.artikelName,
      })
      setEditingArtikel(artikel.id)
    }
  }

  const handleArtikelDelete = async (id: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setArtikels((prev) => prev.filter((artikel) => artikel.id !== id))
      setDeleteArtikelId(null)
    } catch (error) {
      console.error("Error deleting artikel:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setEditingMotif(null)
  }

  const resetCmtForm = () => {
    setEditingCmt(null)
  }

  const resetArtikelForm = () => {
    setEditingArtikel(null)
    setArtikelForm({
      selectedMotifId: "",
      artikelCodeSuffix: "",
      artikelName: "",
    })
  }

  const isMotifFormValid = () => {
    const currentMotif = motifs.find((m) => m.id === editingMotif)
    return currentMotif?.motifCode?.trim() && currentMotif?.motifName?.trim()
  }

  const isCmtFormValid = () => {
    const currentCmt = cmts.find((c) => c.id === editingCmt)
    return (
      currentCmt?.tukangPotongCode?.trim() &&
      currentCmt?.tukangPotongName?.trim() &&
      currentCmt?.cmtCode?.trim() &&
      currentCmt?.cmtName?.trim()
    )
  }

  const isArtikelFormValid = () => {
    return artikelForm.selectedMotifId && artikelForm.artikelCodeSuffix.trim() && artikelForm.artikelName.trim()
  }

  useEffect(() => {
    fetchMotifs()
    fetchCmts()
    fetchArtikels()
  }, [])

  const renderContent = () => {
    if (!activeMenu) {
      return (
        <div className="flex items-center justify-center h-full text-gray-400">Select a menu item to get started</div>
      )
    }

    switch (activeMenu) {
      case "Dashboard":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Stock listing dashboard overview and statistics.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">Access frequently used functions and shortcuts.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">View recent transactions and updates.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "Master Motif":
        const paginatedMotifs = motifs.slice((motifCurrentPage - 1) * itemsPerPage, motifCurrentPage * itemsPerPage)
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Master Motif</h2>

            <Card>
              <CardHeader>
                <CardTitle>Motif List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Motif Code</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Motif Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={3} className="text-center py-8 text-gray-500">
                            Loading...
                          </td>
                        </tr>
                      ) : paginatedMotifs.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="text-center py-8 text-gray-500">
                            No motifs found
                          </td>
                        </tr>
                      ) : (
                        paginatedMotifs.map((motif) => (
                          <tr key={motif.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-800">{motif.motifCode}</td>
                            <td className="py-3 px-4 text-gray-800">{motif.motifName}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleUpdate(motif)}
                                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                >
                                  Update
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setDeleteMotifId(motif.id)}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <PaginationControls
                  currentPage={motifCurrentPage}
                  totalPages={Math.ceil(motifs.length / itemsPerPage)}
                  onPageChange={setMotifCurrentPage}
                />
              </CardContent>
            </Card>

            {/* Form for adding or updating motifs */}
            <Card>
              <CardHeader>
                <CardTitle>{editingMotif ? "Update Motif" : "Add New Motif"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="motifCode">Motif Code</Label>
                      <Input
                        id="motifCode"
                        value={motifs.find((m) => m.id === editingMotif)?.motifCode || ""}
                        onChange={(e) =>
                          setMotifs((prev) =>
                            prev.map((m) =>
                              m.id === editingMotif ? { ...m, motifCode: e.target.value.slice(0, 3).toUpperCase() } : m,
                            ),
                          )
                        }
                        maxLength={3}
                        placeholder="e.g., M01"
                        required
                        className="uppercase"
                      />
                      <p className="text-xs text-gray-500">Maximum 3 characters</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="motifName">Motif Name</Label>
                      <Input
                        id="motifName"
                        value={motifs.find((m) => m.id === editingMotif)?.motifName || ""}
                        onChange={(e) =>
                          setMotifs((prev) =>
                            prev.map((m) =>
                              m.id === editingMotif ? { ...m, motifName: e.target.value.slice(0, 200) } : m,
                            ),
                          )
                        }
                        maxLength={200}
                        placeholder="e.g., Floral Pattern"
                        required
                      />
                      <p className="text-xs text-gray-500">Maximum 200 characters</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    {editingMotif && (
                      <Button type="button" variant="outline" onClick={resetForm}>
                        Cancel
                      </Button>
                    )}
                    <Button type="submit" disabled={isLoading || !isMotifFormValid()}>
                      {isLoading ? "Saving..." : editingMotif ? "Update" : "Submit"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <AlertDialog open={!!deleteMotifId} onOpenChange={() => setDeleteMotifId(null)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this motif? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteMotifId && handleDelete(deleteMotifId)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      case "Master Tukang Potong / CMT":
        const paginatedCmts = cmts.slice((cmtCurrentPage - 1) * itemsPerPage, cmtCurrentPage * itemsPerPage)
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Master Tukang Potong / CMT</h2>

            <Card>
              <CardHeader>
                <CardTitle>CMT List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Tukang Potong Code</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Tukang Potong Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">CMT Code</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">CMT Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isLoading ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-gray-500">
                            Loading...
                          </td>
                        </tr>
                      ) : paginatedCmts.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="text-center py-8 text-gray-500">
                            No CMT records found
                          </td>
                        </tr>
                      ) : (
                        paginatedCmts.map((cmt) => (
                          <tr key={cmt.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-gray-800">{cmt.tukangPotongCode}</td>
                            <td className="py-3 px-4 text-gray-800">{cmt.tukangPotongName}</td>
                            <td className="py-3 px-4 text-gray-800">{cmt.cmtCode}</td>
                            <td className="py-3 px-4 text-gray-800">{cmt.cmtName}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleCmtUpdate(cmt)}
                                  className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                >
                                  Update
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => setDeleteCmtId(cmt.id)}
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                >
                                  Delete
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <PaginationControls
                  currentPage={cmtCurrentPage}
                  totalPages={Math.ceil(cmts.length / itemsPerPage)}
                  onPageChange={setCmtCurrentPage}
                />
              </CardContent>
            </Card>

            {/* Form for adding or updating CMTs */}
            <Card>
              <CardHeader>
                <CardTitle>{editingCmt ? "Update CMT" : "Add New CMT"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCmtSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tukangPotongCode">Tukang Potong Code</Label>
                      <Input
                        id="tukangPotongCode"
                        value={cmts.find((c) => c.id === editingCmt)?.tukangPotongCode || ""}
                        onChange={(e) =>
                          setCmts((prev) =>
                            prev.map((c) =>
                              c.id === editingCmt
                                ? { ...c, tukangPotongCode: e.target.value.slice(0, 3).toUpperCase() }
                                : c,
                            ),
                          )
                        }
                        maxLength={3}
                        placeholder="e.g., TP1"
                        required
                        className="uppercase"
                      />
                      <p className="text-xs text-gray-500">Maximum 3 characters</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tukangPotongName">Tukang Potong Name</Label>
                      <Input
                        id="tukangPotongName"
                        value={cmts.find((c) => c.id === editingCmt)?.tukangPotongName || ""}
                        onChange={(e) =>
                          setCmts((prev) =>
                            prev.map((c) =>
                              c.id === editingCmt ? { ...c, tukangPotongName: e.target.value.slice(0, 200) } : c,
                            ),
                          )
                        }
                        maxLength={200}
                        placeholder="e.g., Ahmad Sutrisno"
                        required
                      />
                      <p className="text-xs text-gray-500">Maximum 200 characters</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cmtCode">CMT Code</Label>
                      <Input
                        id="cmtCode"
                        value={cmts.find((c) => c.id === editingCmt)?.cmtCode || ""}
                        onChange={(e) =>
                          setCmts((prev) =>
                            prev.map((c) =>
                              c.id === editingCmt ? { ...c, cmtCode: e.target.value.slice(0, 3).toUpperCase() } : c,
                            ),
                          )
                        }
                        maxLength={3}
                        placeholder="e.g., C01"
                        required
                        className="uppercase"
                      />
                      <p className="text-xs text-gray-500">Maximum 3 characters</p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cmtName">CMT Name</Label>
                      <Input
                        id="cmtName"
                        value={cmts.find((c) => c.id === editingCmt)?.cmtName || ""}
                        onChange={(e) =>
                          setCmts((prev) =>
                            prev.map((c) =>
                              c.id === editingCmt ? { ...c, cmtName: e.target.value.slice(0, 200) } : c,
                            ),
                          )
                        }
                        maxLength={200}
                        placeholder="e.g., CMT Jakarta Pusat"
                        required
                      />
                      <p className="text-xs text-gray-500">Maximum 200 characters</p>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    {editingCmt && (
                      <Button type="button" variant="outline" onClick={resetCmtForm}>
                        Cancel
                      </Button>
                    )}
                    <Button type="submit" disabled={isLoading || !isCmtFormValid()}>
                      {isLoading ? "Saving..." : editingCmt ? "Update" : "Submit"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            <AlertDialog open={!!deleteCmtId} onOpenChange={() => setDeleteCmtId(null)}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this CMT record? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => deleteCmtId && handleCmtDelete(deleteCmtId)}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )
      case "Master Artikel":
        const paginatedArtikels = artikels.slice(
          (artikelCurrentPage - 1) * itemsPerPage,
          artikelCurrentPage * itemsPerPage,
        )
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Master Artikel</h2>

            <Card>
              <CardHeader>
                <CardTitle>Artikel List</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center py-4">
                    <div className="text-gray-500">Loading...</div>
                  </div>
                ) : (
                  <>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Motif Code</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Artikel Code</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Artikel Name</th>
                            <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {paginatedArtikels.map((artikel) => (
                            <tr key={artikel.id} className="border-b border-gray-100 hover:bg-gray-50">
                              <td className="py-3 px-4 text-gray-800">{artikel.motifCode}</td>
                              <td className="py-3 px-4 text-gray-800">{artikel.artikelCode}</td>
                              <td className="py-3 px-4 text-gray-800">{artikel.artikelName}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleArtikelUpdate(artikel)}
                                    className="text-blue-600 border-blue-600 hover:bg-blue-50"
                                  >
                                    Update
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setDeleteArtikelId(artikel.id)}
                                    className="text-red-600 border-red-600 hover:bg-red-50"
                                  >
                                    Delete
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="text-sm text-gray-500">
                        Showing {(artikelCurrentPage - 1) * itemsPerPage + 1} to{" "}
                        {Math.min(artikelCurrentPage * itemsPerPage, artikels.length)} of {artikels.length} entries
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setArtikelCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={artikelCurrentPage === 1}
                        >
                          Previous
                        </Button>
                        {Array.from({ length: Math.ceil(artikels.length / itemsPerPage) }, (_, i) => i + 1).map(
                          (page) => (
                            <Button
                              key={page}
                              variant={page === artikelCurrentPage ? "default" : "outline"}
                              size="sm"
                              onClick={() => setArtikelCurrentPage(page)}
                              className={page === artikelCurrentPage ? "bg-gray-800 text-white" : ""}
                            >
                              {page}
                            </Button>
                          ),
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setArtikelCurrentPage((prev) =>
                              Math.min(prev + 1, Math.ceil(artikels.length / itemsPerPage)),
                            )
                          }
                          disabled={artikelCurrentPage === Math.ceil(artikels.length / itemsPerPage)}
                        >
                          Next
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{editingArtikel ? "Update Artikel" : "Add New Artikel"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleArtikelSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Master Motif</label>
                      <select
                        value={artikelForm.selectedMotifId}
                        onChange={(e) => setArtikelForm((prev) => ({ ...prev, selectedMotifId: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                        required
                      >
                        <option value="">Select Motif</option>
                        {motifs.map((motif) => (
                          <option key={motif.id} value={motif.id}>
                            {motif.motifCode} - {motif.motifName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Artikel Code</label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-2 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-md min-w-[60px] justify-center">
                          {artikelForm.selectedMotifId
                            ? motifs.find((m) => m.id === artikelForm.selectedMotifId)?.motifCode || "---"
                            : "---"}
                        </span>
                        <input
                          type="text"
                          value={artikelForm.artikelCodeSuffix}
                          onChange={(e) => setArtikelForm((prev) => ({ ...prev, artikelCodeSuffix: e.target.value }))}
                          disabled={!artikelForm.selectedMotifId}
                          className={`flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                            !artikelForm.selectedMotifId ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                          }`}
                          placeholder="001"
                          maxLength={10}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Artikel Name</label>
                      <input
                        type="text"
                        value={artikelForm.artikelName}
                        onChange={(e) => setArtikelForm((prev) => ({ ...prev, artikelName: e.target.value }))}
                        disabled={!artikelForm.selectedMotifId}
                        className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
                          !artikelForm.selectedMotifId ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
                        }`}
                        placeholder="Enter artikel name"
                        maxLength={200}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button
                      type="submit"
                      disabled={isLoading || !isArtikelFormValid()}
                      className="bg-gray-800 text-white hover:bg-gray-700"
                    >
                      {isLoading ? "Saving..." : editingArtikel ? "Update" : "Submit"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {deleteArtikelId && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Confirm Delete</h3>
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this artikel? This action cannot be undone.
                  </p>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setDeleteArtikelId(null)}>
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleArtikelDelete(deleteArtikelId)}
                      className="bg-red-600 text-white hover:bg-red-700"
                      disabled={isLoading}
                    >
                      {isLoading ? "Deleting..." : "Delete"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )

      case "PO":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Purchase Orders</h2>
            <Card>
              <CardHeader>
                <CardTitle>PO Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">View and manage all purchase orders.</p>
              </CardContent>
            </Card>
          </div>
        )
      case "Setoran":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Setoran</h2>
            <Card>
              <CardHeader>
                <CardTitle>Deposit Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Track and manage all deposits and submissions.</p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return null
    }
  }

  const PaginationControls = ({
    currentPage,
    totalPages,
    onPageChange,
  }: {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
  }) => {
    if (totalPages <= 1) return null

    return (
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={page === currentPage ? "bg-gray-800 text-white" : ""}
            >
              {page}
            </Button>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex">
      <nav className="w-64 bg-gray-100 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">Stock Listing Dashboard</h1>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Button
                key={item}
                variant={activeMenu === item ? "default" : "ghost"}
                onClick={() => setActiveMenu(item)}
                className={`w-full justify-start px-4 py-3 text-sm font-medium transition-colors ${
                  activeMenu === item
                    ? "bg-gray-800 text-white hover:bg-gray-700"
                    : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                }`}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      <main className="flex-1 p-8">{renderContent()}</main>
    </div>
  )
}
