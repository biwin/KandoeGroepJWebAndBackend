import {SnapshotManager} from "../logic/snapshotManager";
import {Response, Request} from "express";
import {Snapshot} from "../model/snapshot";
import {UserApi} from "./userApi";

export class SnapshotApi {
    private static mgr:SnapshotManager = new SnapshotManager();

    public static findAll(req:Request, res:Response) {
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
           if(currentUserId != null){
               SnapshotApi.mgr.getSnapshotsByUserId(currentUserId, (snapshots:Snapshot[]) =>{
                   res.status(200).send(snapshots);
               });
           } else {
               res.status(401).send({_error: 'Unauthorized'});
           }
        });
    }

    public static createSnapshot(req:Request, res:Response){
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId:string) => {
           if(currentUserId != null){
                SnapshotApi.mgr.createSnapshot(currentUserId, req.body._sessionId, (snapshot:Snapshot) => {
                   res.status(200).send(snapshot);
                });
           } else {
               res.status(401).send({_error: 'Unauthorized'});
           }
        });
    }
    
    public static getById(req:Request, res:Response){
        UserApi.getCurrentUserId(req.header('Bearer'), (currentUserId: string) => {
            if(currentUserId != null){
                SnapshotApi.mgr.getById(req.params.id, (snapshot:Snapshot) =>{
                    res.status(200).send(snapshot);
                });
            } else {
                res.status(401).send({_error: 'Unauthorized'});
            }
        });
    }
}