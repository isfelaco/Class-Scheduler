import {
  createAssignment,
  deleteAssignment,
  fetchAssignments,
  resetAssignments,
} from "../hooks/assignmentHooks";
import axios from "axios";

jest.mock("axios");

describe("fetchAssignments", () => {
  // source: https://stackoverflow.com/questions/57816438/why-does-mocked-axios-get-method-return-undefined
  it("fetches successfully data from an API", async () => {
    const data = {
      data: {
        hits: [
          {
            id: 1,
            classID: 1,
            title: "Title",
          },
        ],
      },
    };
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(data)
    );
    await expect(fetchAssignments()).resolves.toEqual(data.data);
  });

  // source: https://www.robinwieruch.de/axios-jest/
  it("fetches erroneously data from an API", async () => {
    const errorMessage = "Network Error";
    (axios.get as jest.Mock).mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    );
    await expect(fetchAssignments()).rejects.toThrow(errorMessage);
  });
});

describe("createAssignment", () => {
  it("creates class successfully", async () => {
    const initialData = {
      data: {
        hits: [
          {
            id: 1,
            classID: 1,
            title: "Title 1",
          },
        ],
      },
    };
    const postData = {
      data: {
        hits: [
          {
            id: 1,
            classID: 1,
            title: "Title 1",
          },
          {
            id: 2,
            classID: 1,
            title: "Title 3",
          },
        ],
      },
    };
    const newAssignment = {
      id: 2,
      classID: 1,
      title: "Title 2",
      description: "Description",
      due_date: new Date(),
    };
    // const mockAxiosGet = jest.spyOn(axios, "get");
    // mockAxiosGet.mockImplementation(async () => initialData);
    // await fetchAssignments().then((res) =>
    //   expect(res).toEqual(initialData.data)
    // );

    // const mockAxiosPost = jest.spyOn(axios, "post");
    // mockAxiosPost.mockImplementation(async () => postData);
    // await createAssignment(newAssignment).then((res) => {
    //   console.log(res);
    //   expect(res).toEqual(postData.data);
    // });

    (axios.post as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(postData)
    );
    await expect(createAssignment(newAssignment)).resolves.toEqual(
      postData.data
    );
    // await createAssignment(newAssignment).then((res) => {
    //   expect(res).toEqual(postData);
    // });
  });
});

describe.skip("deleteClass", () => {
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

describe.skip("resetClasses", () => {
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
