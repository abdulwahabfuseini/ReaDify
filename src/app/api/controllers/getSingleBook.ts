


export const getSingleBook = async (id) => {
    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyBaLAcQXx9x97vh638_dNnDg_agsBSESDI/${id}`, {
        cache: "no-store",
      });
  
      const book = await res.json();
      return book.data;
    } catch (error) {
      return NextResponse.json(
        { message: "Failed to get book" },
        { status: 500 }
      );
    }
  };