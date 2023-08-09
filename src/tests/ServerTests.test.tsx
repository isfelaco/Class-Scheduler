import {
  createClass,
  deleteClass,
  fetchClasses,
  resetClasses,
} from "../queryHooks";
import axios from "axios";

jest.mock("axios");

describe("fetchClasses", () => {
  // source: https://stackoverflow.com/questions/57816438/why-does-mocked-axios-get-method-return-undefined
  it("fetches successfully data from an API", async () => {
    const data = {
      data: {
        hits: [
          {
            id: 1,
            numeric: "Numeric",
            title: "Title",
            professor: "Professor",
          },
        ],
      },
    };
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(data)
    );
    await expect(fetchClasses()).resolves.toEqual(data.data);
  });

  // source: https://www.robinwieruch.de/axios-jest/
  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(fetchClasses()).rejects.toThrow(errorMessage);
  });
});

describe("createClass", () => {
  it("creates class successfully", async () => {
    const initialData = {
      data: {
        hits: [
          {
            id: 1,
            numeric: "Numeric",
            title: "Title",
            professor: "Professor",
          },
        ],
      },
    };
    const postData = {
      data: {
        hits: [
          {
            id: 1,
            numeric: "Numeric",
            title: "Title",
            professor: "Professor",
          },
          {
            id: 2,
            numeric: "Numeric 2",
            title: "Title 2",
            professor: "Professor 2",
          },
        ],
      },
    };
    const newClass = {
      numeric: "Numeric 2",
      title: "Title 2",
      professor: "Professor 2",
    };
    const mockAxiosGet = jest.spyOn(axios, "get");
    mockAxiosGet.mockImplementation(async () => initialData);
    await fetchClasses().then((res) => expect(res).toEqual(initialData.data));

    const mockAxiosPost = jest.spyOn(axios, "post");
    mockAxiosPost.mockImplementation(async () => postData);
    await createClass(newClass).then((res) =>
      expect(res).toEqual(postData.data)
    );
  });
});

describe("deleteClass", () => {
  it("deletes class successfully", async () => {
    const initialData = {
      data: {
        hits: [
          {
            id: 1,
            numeric: "Numeric",
            title: "Title",
            professor: "Professor",
          },
          {
            id: 2,
            numeric: "Numeric 2",
            title: "Title 2",
            professor: "Professor 2",
          },
        ],
      },
    };
    const putData = {
      data: {
        hits: [
          {
            id: 1,
            numeric: "Numeric",
            title: "Title",
            professor: "Professor",
          },
        ],
      },
    };

    const mockAxiosGet = jest.spyOn(axios, "get");
    mockAxiosGet.mockImplementation(async () => initialData);
    await fetchClasses().then((res) => expect(res).toEqual(initialData.data));

    const mockAxiosPut = jest.spyOn(axios, "put");
    mockAxiosPut.mockImplementation(async () => putData);
    await deleteClass(2, "Title 2").then((res) =>
      expect(res).toEqual(putData.data)
    );
  });
});

describe("resetClasses", () => {
  it("resets all classes successfully", async () => {
    const data = {
      data: {
        hits: [
          {
            id: 1,
            numeric: "Numeric",
            title: "Title",
            professor: "Professor",
          },
        ],
      },
    };
    const emptyData = {
      data: { hits: [] },
    };
    const mockAxiosGet = jest.spyOn(axios, "get");
    mockAxiosGet.mockImplementation(async () => data);
    await fetchClasses().then((res) => expect(res).toEqual(data.data));

    const mockAxiosPut = jest.spyOn(axios, "put");
    mockAxiosPut.mockImplementation(async () => emptyData);
    await resetClasses().then((res) => expect(res).toEqual(emptyData.data));
  });
});
