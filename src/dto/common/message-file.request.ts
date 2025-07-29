import FileBody from "./fiile.request";

export default interface MessageFileBody extends FileBody {
    m_type?: number;
}